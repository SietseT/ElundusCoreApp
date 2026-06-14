use reqwest::StatusCode;

#[tauri::command]
async fn fetch_speech(voice: String, text: String) -> Result<String, String> {
    let client = reqwest::Client::new();

    let params = [("voice", voice.as_str()), ("text", text.as_str())];

    let response = client
        .post("https://streamlabs.com/polly/speak")
        .header("Referer", "https://streamlabs.com/")
        .form(&params)
        .send()
        .await
        .map_err(|e| e.to_string())?;

    match response.status() {
        StatusCode::UNPROCESSABLE_ENTITY => return Err("422".to_string()),
        StatusCode::TOO_MANY_REQUESTS => return Err("429".to_string()),
        s if !s.is_success() => return Err(format!("HTTP {}", s.as_u16())),
        _ => {}
    }

    let json: serde_json::Value = response.json().await.map_err(|e| e.to_string())?;

    let speak_url = json["speak_url"]
        .as_str()
        .filter(|s| !s.is_empty())
        .ok_or_else(|| "No speakUrl in API response".to_string())?
        .to_string();

    Ok(speak_url)
}

#[tauri::command]
async fn download_speech(url: String) -> Result<Vec<u8>, String> {
    let client = reqwest::Client::new();
    let response = client.get(&url).send().await.map_err(|e| e.to_string())?;

    if !response.status().is_success() {
        return Err(format!("HTTP {}", response.status().as_u16()));
    }

    let bytes = response.bytes().await.map_err(|e| e.to_string())?;
    Ok(bytes.to_vec())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![fetch_speech, download_speech])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
