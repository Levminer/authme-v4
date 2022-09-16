#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]
#![allow(dead_code, unused_imports, unused_variables)]

use std::env;
use tauri::*;
use window_vibrancy::{apply_mica, apply_vibrancy, NSVisualEffectMaterial};

mod auto_launch;
mod encryption;
mod libraries;
mod system_info;

#[derive(Clone, serde::Serialize)]
struct Payload {
    message: String,
}

fn make_tray() -> SystemTray {
    let menu = SystemTrayMenu::new()
        .add_item(CustomMenuItem::new("toggle".to_string(), "Hide Authme"))
        .add_item(CustomMenuItem::new("settings".to_string(), "Settings"))
        .add_item(CustomMenuItem::new("exit".to_string(), "Exit Authme"));
    return SystemTray::new().with_menu(menu);
}

fn handle_tray_event(app: &AppHandle, event: SystemTrayEvent) {
    let toggle_window = |app: AppHandle| -> () {
        let window = app.get_window("main").unwrap();
        let menu_item = app.tray_handle().get_item("toggle");

        if window.is_visible().unwrap() {
            window.hide().unwrap();
            menu_item.set_title("Show Authme").unwrap();
        } else {
            app.emit_all(
                "openCodes",
                Payload {
                    message: "Open codes page".into(),
                },
            )
            .unwrap();

            window.show().unwrap();
            window.unminimize().unwrap();
            window.set_focus().unwrap();

            menu_item.set_title("Hide Authme").unwrap();
        }
    };

    if let SystemTrayEvent::LeftClick { position, size, .. } = event {
        toggle_window(app.clone())
    }

    if let SystemTrayEvent::MenuItemClick { id, .. } = event {
        if id.as_str() == "exit" {
            std::process::exit(0);
        }

        if id.as_str() == "settings" {
            let window = app.get_window("main").unwrap();

            window.show().unwrap();
            window.unminimize().unwrap();
            window.set_focus().unwrap();

            app.emit_all(
                "openSettings",
                Payload {
                    message: "Open settings page".into(),
                },
            )
            .unwrap()
        }

        if id.as_str() == "toggle" {
            toggle_window(app.clone())
        }
    }
}

fn main() {
    let context = tauri::generate_context!();

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            auto_launch::auto_launch,
            system_info::system_info,
            encryption::encrypt_password,
            encryption::verify_password,
            encryption::encrypt_data,
            encryption::decrypt_data,
            encryption::set_entry,
            encryption::get_entry,
            encryption::receive_encryption_key,
            encryption::set_encryption_key,
            encryption::delete_entry,
            libraries::get_args,
            libraries::update_tray,
        ])
        .plugin(tauri_plugin_single_instance::init(|app, argv, cwd| {
            println!("{}, {argv:?}, {cwd}", app.package_info().name);

            let window = app.get_window("main").unwrap();

            window.show().unwrap();
            window.unminimize().unwrap();
            window.set_focus().unwrap();
        }))
        .system_tray(make_tray())
        .on_system_tray_event(handle_tray_event)
        .setup(|app| {
            let win = app.get_window("main").unwrap();

            // Transparent effects
            #[cfg(target_os = "macos")]
            apply_vibrancy(&win, NSVisualEffectMaterial::AppearanceBased)
                .expect("Unsupported platform! 'apply_vibrancy' is only supported on macOS");

            #[cfg(target_os = "windows")]
            apply_mica(&win)
                .expect("Unsupported platform! 'apply_blur' is only supported on Windows");

            let window = win.get_window("main").unwrap();
            let args: Vec<String> = env::args().collect();

            // Show window if auto launch argument not detected
            if args.len() >= 2 {
                if args[1] != "--minimized" {
                    window.maximize().unwrap();
                    window.show().unwrap();
                    window.set_focus().unwrap();
                } else {
                    window.maximize().unwrap();

                    let menu_item = app.tray_handle().get_item("toggle");
                    menu_item.set_title("Show Authme").unwrap();
                }
            } else {
                window.maximize().unwrap();
                window.show().unwrap();
                window.set_focus().unwrap();
            }

            // Temporary fix for transparency
            window.set_decorations(true).unwrap();

            Ok(())
        })
        .on_window_event(|event| match event.event() {
            tauri::WindowEvent::CloseRequested { api, .. } => {
                api.prevent_close();
                let app = event.window().app_handle();

                let window = app.get_window("main").unwrap();
                let menu_item = app.tray_handle().get_item("toggle");

                if window.is_visible().unwrap() {
                    window.hide().unwrap();
                    menu_item.set_title("Show Authme").unwrap();
                } else {
                    window.show().unwrap();
                    window.unminimize().unwrap();
                    window.set_focus().unwrap();

                    menu_item.set_title("Hide Authme").unwrap();
                }
            }
            _ => {}
        })
        .run(context)
        .expect("error while running tauri application");
}
