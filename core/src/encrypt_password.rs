use argon2::{
    password_hash::{rand_core::OsRng, PasswordHash, PasswordHasher, PasswordVerifier, SaltString},
    Argon2,
};

static mut STORED_PASSWORD: String = String::new();

#[tauri::command]
pub fn encrypt_password(password: String) -> String {
    let salt = SaltString::generate(&mut OsRng);

    // Argon2 with default params (Argon2id v19)
    let argon2 = Argon2::default();

    // Hash password to PHC string ($argon2id$v=19$...)
    let password_hash = argon2
        .hash_password(password.as_bytes(), &salt)
        .unwrap()
        .to_string();

    let parsed_hash = PasswordHash::new(&password_hash).unwrap();

    assert!(Argon2::default()
        .verify_password(password.as_bytes(), &parsed_hash)
        .is_ok());

    password_hash.into()
}

#[tauri::command]
pub fn verify_password(password: String, hash: String) -> bool {

    let parsed_hash = PasswordHash::new(&hash).unwrap();

    let result = Argon2::default()
        .verify_password(password.as_bytes(), &parsed_hash)
        .is_ok();

    if result {
        unsafe {
            STORED_PASSWORD = password;
        }
    }

    result.into()
}

#[tauri::command]
pub fn request_password() -> String {
    unsafe {
        STORED_PASSWORD.as_str().into()
    }
}
