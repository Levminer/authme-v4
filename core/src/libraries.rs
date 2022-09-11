use std::env;

#[tauri::command]
pub fn get_args() -> Vec<String> {
    let args: Vec<String> = env::args().collect();

    args.into()
}
