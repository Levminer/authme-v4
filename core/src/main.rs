#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use tauri::*;
use window_vibrancy::{apply_mica, apply_vibrancy, NSVisualEffectMaterial};

mod auto_launch;
mod encrypt_password;
mod system_info;

// the payload type must implement `Serialize` and `Clone`.
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
            window.show().unwrap();
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
            // auto_launch::auto_launch,
            system_info::system_info,
            encrypt_password::encrypt_password,
            encrypt_password::verify_password,
            encrypt_password::request_password
        ])
        .system_tray(make_tray())
        .on_system_tray_event(handle_tray_event)
        .setup(|app| {
            let win = app.get_window("main").unwrap();

            #[cfg(target_os = "macos")]
            apply_vibrancy(&win, NSVisualEffectMaterial::AppearanceBased)
                .expect("Unsupported platform! 'apply_vibrancy' is only supported on macOS");

            #[cfg(target_os = "windows")]
            apply_mica(&win)
                .expect("Unsupported platform! 'apply_blur' is only supported on Windows");

            let window = win.get_window("main").unwrap();

            window.maximize().unwrap();
            window.set_focus().unwrap();
            window.set_decorations(true).unwrap();

            Ok(())
        })
        .on_window_event(|event| match event.event() {
            tauri::WindowEvent::CloseRequested { api, .. } => {
                api.prevent_close();

                event.window().hide().unwrap();
            }

            tauri::WindowEvent::Focused(focused) => {
                let app = event.window().app_handle();

                if *focused {
                    app.emit_all(
                        "focusSearch",
                        Payload {
                            message: "Focus search bar".into(),
                        },
                    )
                    .unwrap()
                }
            }
            _ => {}
        })
        .run(context)
        .expect("error while running tauri application");
}
