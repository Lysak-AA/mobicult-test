import { defineStore } from 'pinia'

export const useAlertsStore = defineStore('alerts', {
    state: () => (
        {
            showAlert: false,
            alertText: '',
            status: 'success' 
        }
    ),
    actions: {
        openAlert(text: string, status: 'success' | 'error') {
            this.showAlert = true
            this.alertText = text
            this.status = status
        },
        closeAlert() {
            this.showAlert = false
        }
    }
})

export const usePopupStore = defineStore('popup', {
    state: () => (
        {
            showPopup: false
        }
    ),
    actions: {
        openPopup() {
            this.showPopup = true
        },
        closePopup() {
            this.showPopup = false
        }
    }
})
  