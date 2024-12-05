import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import BottomSlideModal from '../components/BottomSlideModal';
import Navbar from '../components/CurvyBottomNav';

const TvGuide = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={openModal}>
        <Text style={styles.buttonText}>Open Modal</Text>
      </TouchableOpacity>

      {/* <BottomSlideModal isVisible={isModalVisible} onClose={closeModal}>
        <Text style={styles.modalText}>This is the modal content!</Text>
      </BottomSlideModal> */}
      <Navbar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  modalText: {
    fontSize: 18,
    textAlign: 'center',
  },
});

export default TvGuide;
