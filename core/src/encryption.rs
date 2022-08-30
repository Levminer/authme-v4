use argon2::{
    password_hash::{rand_core::OsRng, PasswordHash, PasswordHasher, PasswordVerifier, SaltString},
    Argon2,
};

use magic_crypt::{new_magic_crypt, MagicCryptTrait};

extern crate keyring;

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

    result.into()
}

#[tauri::command]
pub fn encrypt_data(key: String, data: String) -> String {
    let mc = new_magic_crypt!(key, 256);

    let encrypted_string = mc.encrypt_str_to_base64(data);

    encrypted_string.into()
}

#[tauri::command]
pub fn decrypt_data(key: String, data: String) -> String {
    let mc = new_magic_crypt!(key, 256);

    let decrypted_string = mc.decrypt_base64_to_string(data).unwrap();

    decrypted_string.into()
}

#[tauri::command]
pub fn set_entry(name: String, data: String) {
    let service = "authme_dev";
    let entry = keyring::Entry::new(&service, &name);

    entry.set_password(data.as_str());
}

#[tauri::command]
pub fn get_entry(name: String) -> String {
    let service = "authme_dev";
    let entry = keyring::Entry::new(&service, &name);

    let item = entry.get_password().unwrap();

    item.into()
}
