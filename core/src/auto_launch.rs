use auto_launch::*;
use std::env;

#[tauri::command]
pub fn auto_launch() {
    let exe = env::current_exe().unwrap();
    let exe_string = exe.to_str().unwrap();

    let app_name = "Authme v4";
    let app_path = exe_string;
    let args = &["--minimized"];
    let auto = AutoLaunch::new(app_name, app_path, args);

    let enabled = auto.is_enabled().unwrap();

    if enabled == false {
        auto.enable().unwrap();
    } else {
        auto.disable().unwrap();
    }
}
