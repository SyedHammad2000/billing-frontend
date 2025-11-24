import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import { Button, Image, Text } from "react-native";
import { Upload } from "upload-js";

const upload = Upload({ apiKey: "public_W23MTSjFo8MYvm4UESmym8n3wSLh" });

export default function UploadImage({
  onUpload,
  reset,
}: {
  onUpload: (url: string) => void;
  reset: boolean;
}) {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (reset) setImage(null);
  }, [reset]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setLoading(true);
      const uri = result.assets[0].uri;
      setImage(uri);

      const response = await fetch(uri);
      const blob = await response.blob();
      (blob as any).name = "upload.jpg"; // fix for Upload.io

      const { fileUrl } = await upload.uploadFile(blob as any);
      onUpload(fileUrl); // send URL to parent
      setLoading(false);
    }
  };

  return (
    <>
      <Button title="Pick Image" onPress={pickImage} />
      {image && (
        <Image
          source={{ uri: image }}
          style={{ width: 200, height: 200, marginTop: 20, margin: "auto" }}
        />
      )}
      {loading && (
        <Text style={{ marginTop: 20, color: "black", fontSize: 20,alignSelf:"center" }}>
          Wait for the Reset Pic Button then Submit.
        </Text>
      )}
    </>
  );
}
