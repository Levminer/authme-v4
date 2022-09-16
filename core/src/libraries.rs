use std::env;
use tauri::{GlobalShortcutManager, Manager};

#[tauri::command]
pub fn get_args() -> Vec<String> {
    let args: Vec<String> = env::args().collect();

    args.into()
}

#[tauri::command]
pub fn update_tray(app: tauri::AppHandle) {
    let window = app.get_window("main").unwrap();
    let menu_item = app.tray_handle().get_item("toggle");

    if window.is_visible().unwrap() {
        menu_item.set_title("Show Authme").unwrap();
    } else {
        menu_item.set_title("Hide Authme").unwrap();
    }
}
