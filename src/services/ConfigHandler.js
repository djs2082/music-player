import Aws from "./aws";

class ConfigHandler {
  constructor() {
    const configData = localStorage.getItem("config_data");
    this.configDataJson = JSON.parse(configData.toString('utf-8'));
    this.aws = new Aws();
  }

  addNewConfig = (song, imageUrl, location = null, date = null, author = null, note = null) => {
    const id = this.configDataJson[this.configDataJson.length - 1].id + 1;
    const newJsonData = [...this.configDataJson, {
      id,
      image_url: imageUrl,
      location,
      date,
      song,
      notes: []
    }]
    const jsonString = JSON.stringify(newJsonData);
    const jsonBlob = new Blob([jsonString], { type: 'application/json' });
    return this.aws.uploadConfig(jsonBlob)
  }

  updateSongInConfig = (id, song, location = null, date = null) => {
    const newJsonData = this.configDataJson.map((data) => {
      if (data.id === id) {
        return ({ ...data, song, location, date })
      }
      return data;
    })
    // const newJsonData = [...this.configDataJson]
    const jsonString = JSON.stringify(newJsonData);
    const jsonBlob = new Blob([jsonString], { type: 'application/json' });
    return this.aws.uploadConfig(jsonBlob)
  }

  deleteTheConfig = (id) => {
    const newJsonData = this.configDataJson.filter((data) => (data.id !== id))
    const jsonString = JSON.stringify(newJsonData);
    const jsonBlob = new Blob([jsonString], { type: 'application/json' });
    return this.aws.uploadConfig(jsonBlob)
  }

  deleteSongInConfig = (id) => {
    const newJsonData = this.configDataJson.map((data) => {
      if (data.id === id) {
        return ({ ...data, song: null })
      }
      return data;
    })
    // const newJsonData = [...this.configDataJson]
    const jsonString = JSON.stringify(newJsonData);
    const jsonBlob = new Blob([jsonString], { type: 'application/json' });
    return this.aws.uploadConfig(jsonBlob)
  }
}

export default ConfigHandler;
