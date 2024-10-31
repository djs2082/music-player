import Aws from "./aws";

class ConfigHandler {
  constructor() {
    const configData = localStorage.getItem("config_data");
    this.configDataJson = JSON.parse(configData.toString('utf-8'));
    this.aws = new Aws();
  }

  addNewConfig = (song, imageUrl, author = null, note = null) => {
    const id = this.configDataJson.length + 1;
    const newJsonData = [...this.configDataJson, {
      id,
      image_url: imageUrl,
      song,
      notes: []
    }]
    const jsonString = JSON.stringify(newJsonData);
    const jsonBlob = new Blob([jsonString], { type: 'application/json' });
    return this.aws.uploadConfig(jsonBlob)
  }

  updateSongInConfig = (id, song) => {
    const newJsonData = this.configDataJson.map((data) => {
      console.log(data.id, id)
      if (data.id === id) {
        return ({ ...data, song })
      }
      return data;
    })
    console.log(newJsonData);
    // const newJsonData = [...this.configDataJson]
    const jsonString = JSON.stringify(newJsonData);
    const jsonBlob = new Blob([jsonString], { type: 'application/json' });
    return this.aws.uploadConfig(jsonBlob)
  }
}

export default ConfigHandler;
