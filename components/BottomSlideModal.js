import React from 'react';
import {
  Modal,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Dimensions,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';

const { height } = Dimensions.get('window');

const BottomSlideModal = ({ isVisible, onClose, data, onVideoPress }) => {
  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              <ScrollView>
                {data.length === 0 ? (
                  <Text style={styles.noVideosText}>No video in this category</Text>
                ) : (
                  data.map((video) => (
                    <TouchableOpacity
                      key={video.id}
                      style={styles.modalVideoItem}
                      onPress={() => onVideoPress(video)}
                    >
                      <Image source={{ uri: video.thumbnail }} style={styles.modalThumbnail} />
                      <Text style={styles.modalVideoTitle}>{video.title}</Text>
                    </TouchableOpacity>
                  ))
                )}
              </ScrollView>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    height: height * 0.4, // 40% of screen height
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
  },
  modalVideoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  modalThumbnail: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 5,
  },
  modalVideoTitle: {
    fontSize: 16,
    color: '#000',
  },
  noVideosText: {
    fontSize: 18,
    color: 'gray',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default BottomSlideModal;
