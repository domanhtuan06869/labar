import * as React from 'react';
import { Text, View, StyleSheet ,Button} from 'react-native';
import Constants from 'expo-constants';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';

// You can import from local files
import AssetExample from './components/AssetExample';

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';

export default class App extends React.Component {
  downloadFile(){
    const uri = "https://english4u.com.vn/Uploads/images/Anh/link-download-ngu-phap-tieng-anh-hay.png"
    let fileUri = FileSystem.documentDirectory + "anh.png";
    FileSystem.downloadAsync(uri, fileUri)
    .then(({ uri }) => {
        this.saveFile(uri);
      })
      .catch(error => {
        console.error(error);
      })
}

saveFile = async (fileUri: string) => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === "granted") {
        const asset = await MediaLibrary.createAssetAsync(fileUri)
        await MediaLibrary.createAlbumAsync("Download", asset, false)
    }
}
  render() {
    return (
      <View style={styles.container}>
        <Button style={styles.paragraph} onPress={()=>{
          this.downloadFile()
        }} title='hahah'/>
        
    
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
