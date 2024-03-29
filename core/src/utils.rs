use rand::distributions::Alphanumeric;
use rand::{thread_rng, Rng};
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

#[tauri::command]
pub fn random_values(length: usize) -> String {
    let rand_string: String = thread_rng()
        .sample_iter(&Alphanumeric)
        .take(length)
        .map(char::from)
        .collect();

    rand_string.into()
}

#[tauri::command]
pub fn logger(message: String, time: String, kind: &str) {
    match kind {
        "log" => println!(
            "\x1b[32m[AUTHME LOG] \x1b[34m({}) \x1b[37m{}",
            time, message
        ),
        "warn" => println!(
            "\x1b[33m[AUTHME WARN] \x1b[34m({}) \x1b[37m{}",
            time, message
        ),
        "error" => println!(
            "\x1b[31m[AUTHME ERROR] \x1b[34m({}) \x1b[37m{}",
            time, message
        ),
        &_ => println!(
            "\x1b[31m[AUTHME LOG] \x1b[34m({}) \x1b[37m{}",
            time, message
        ),
    }
}
