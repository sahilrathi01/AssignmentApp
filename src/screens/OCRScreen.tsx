import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import MlkitOcr from 'react-native-mlkit-ocr';
import {OCRFields} from '../types';
import {saveOCR, getOCR} from '../store/storage';

export default function OCRScreen() {
  const [uri, setUri] = useState<string | undefined>();
  const [fields, setFields] = useState<OCRFields>({
    name: '',
    idNumber: '',
    dob: '',
    confidences: {name: 0.7, idNumber: 0.6, dob: 0.65}, // default mocks
  });

  React.useEffect(() => {
    (async () => {
      const saved = await getOCR();
      if (saved) setFields(saved);
    })();
  }, []);

  const pick = async (useCamera: boolean) => {
    const res = useCamera
      ? await launchCamera({mediaType: 'photo'})
      : await launchImageLibrary({mediaType: 'photo'});
    const asset = res.assets?.[0];
    if (!asset?.uri) return;
    setUri(asset.uri);
    const blocks = await MlkitOcr.detectFromUri(asset.uri);
    const fullText = blocks.map(b => b.text).join(' ');
    // naive parsing: try to guess name/id/dob
    const dobMatch = fullText.match(/(\d{2}[\/\-]\d{2}[\/\-]\d{4})/);
    const idMatch = fullText.match(/([A-Z]{2,}[0-9]{4,}|[0-9]{6,})/);
    const nameMatch = fullText.match(/Name[:\s]*([A-Za-z ]{3,})/i);

    setFields({
      name: nameMatch?.[1]?.trim() || fields.name,
      idNumber: idMatch?.[1] || fields.idNumber,
      dob: dobMatch?.[1] || fields.dob,
      confidences: {
        name: nameMatch ? 0.9 : 0.6,
        idNumber: idMatch ? 0.85 : 0.5,
        dob: dobMatch ? 0.88 : 0.5,
      },
    });
  };

  const save = async () => {
    await saveOCR(fields);
    Alert.alert('Saved!');
  };

  return (
    <ScrollView contentContainerStyle={{padding: 16, gap: 12}}>
      <View style={{flexDirection: 'row', gap: 12}}>
        <Button title="Capture" onPress={() => pick(true)} />
        <Button title="Upload" onPress={() => pick(false)} />
      </View>
      {uri && (
        <Image
          source={{uri}}
          style={{height: 180, borderRadius: 8}}
          resizeMode="cover"
        />
      )}

      <Text>Name (conf: {(fields.confidences.name * 100).toFixed(0)}%)</Text>
      <TextInput
        value={fields.name}
        onChangeText={t => setFields(f => ({...f, name: t}))}
        style={{borderWidth: 1, padding: 8, borderRadius: 8}}
      />
      <Text>
        ID Number (conf: {(fields.confidences.idNumber * 100).toFixed(0)}%)
      </Text>
      <TextInput
        value={fields.idNumber}
        onChangeText={t => setFields(f => ({...f, idNumber: t}))}
        style={{borderWidth: 1, padding: 8, borderRadius: 8}}
      />
      <Text>DOB (conf: {(fields.confidences.dob * 100).toFixed(0)}%)</Text>
      <TextInput
        value={fields.dob}
        onChangeText={t => setFields(f => ({...f, dob: t}))}
        placeholder="DD/MM/YYYY"
        style={{borderWidth: 1, padding: 8, borderRadius: 8}}
      />

      <Button title="Save" onPress={save} />
    </ScrollView>
  );
}
