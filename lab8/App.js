import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Modal, 
  StyleSheet, 
  TouchableOpacity, 
  ActivityIndicator, 
  ToastAndroid, 
  Platform, 
  Dimensions
} from 'react-native';

export default function App() {
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);
  const [loadingVisible, setLoadingVisible] = useState(false);

  const showToast = (message = "Action completed successfully!") => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else {
      alert(message);
    }
  };

  const showLoading = () => {
    setLoadingVisible(true);
    setTimeout(() => {
      setLoadingVisible(false);
      showToast("Data loaded successfully!");
    }, 1500); // Зменш затримку до 1.5 секунд
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lab 8: Interactive Modals</Text>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.button, styles.confirmButton]}
          onPress={() => setConfirmVisible(true)}
        >
          <Text style={styles.buttonText}>Confirm Action</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, styles.errorButton]}
          onPress={() => setErrorVisible(true)}
        >
          <Text style={styles.buttonText}>Show Error</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, styles.toastButton]}
          onPress={() => showToast("This is a toast message!")}
        >
          <Text style={styles.buttonText}>Show Toast</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, styles.loadingButton]}
          onPress={showLoading}
        >
          <Text style={styles.buttonText}>Fetch Data</Text>
        </TouchableOpacity>
      </View>

      {/* Confirm Modal */}
      <Modal transparent visible={confirmVisible} animationType="fade">
        <View style={styles.modalBackdrop}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Confirm Action</Text>
            <Text style={styles.modalText}>Are you sure you want to perform this action?</Text>
            <View style={styles.buttonRow}>
              <TouchableOpacity 
                onPress={() => setConfirmVisible(false)} 
                style={[styles.modalButton, styles.cancelButton]}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={() => {
                  setConfirmVisible(false);
                  showToast("Action confirmed!");
                }} 
                style={[styles.modalButton, styles.confirmModalButton]}
              >
                <Text style={styles.modalButtonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Error Modal */}
      <Modal transparent visible={errorVisible} animationType="slide">
        <View style={styles.modalBackdrop}>
          <View style={[styles.modalBox, styles.errorModalBox]}>
            <Text style={[styles.modalTitle, styles.errorTitle]}>Error Occurred!</Text>
            <Text style={styles.modalText}>We encountered an issue while processing your request.</Text>
            <View style={styles.buttonRow}>
              <TouchableOpacity 
                onPress={() => {
                  setErrorVisible(false);
                  showLoading();
                }} 
                style={[styles.modalButton, styles.retryButton]}
              >
                <Text style={styles.modalButtonText}>Retry</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={() => setErrorVisible(false)} 
                style={[styles.modalButton, styles.cancelButton]}
              >
                <Text style={styles.modalButtonText}>Dismiss</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Loading Modal */}
      <Modal transparent visible={loadingVisible} animationType="none">
        <View style={styles.loadingBackdrop}>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#2196F3" />
            <Text style={styles.loadingText}>Loading...</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 30,
    fontWeight: 'bold',
    color: '#333',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    gap: 16,
  },
  button: {
    width: '100%',
    maxWidth: 300,
    padding: 16,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  confirmButton: {
    backgroundColor: '#4CAF50',
  },
  errorButton: {
    backgroundColor: '#F44336',
  },
  toastButton: {
    backgroundColor: '#FF9800',
  },
  loadingButton: {
    backgroundColor: '#2196F3',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    width: width * 0.85,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 25,
    alignItems: 'center',
    elevation: 5,
  },
  errorModalBox: {
    borderTopWidth: 5,
    borderTopColor: '#F44336',
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  errorTitle: {
    color: '#F44336',
  },
  modalText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 6,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    backgroundColor: '#f0f0f0',
  },
  confirmModalButton: {
    backgroundColor: '#4CAF50',
  },
  retryButton: {
    backgroundColor: '#2196F3',
  },
  loadingBackdrop: {
    flex: 1,
    backgroundColor: '#00000099',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
});