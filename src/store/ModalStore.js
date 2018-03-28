// Extentions
import { computed, observable, action, useStrict } from 'mobx';

useStrict(true)

class ModalObservableStore { 
    @observable display = false;
    @observable modalProps = null;
    @observable disabled = {
        date: true,
        title: true,
        authors: true,
        exists: false
    };

    @computed get displayGetter() {
        return this.display ? 'block' : 'none';
    }

    @computed get disabledGetter() {
        for (var key in this.disabled) {
            if (this.disabled[key]) {
                return true;
            }
        }
        return false;
    }

    @action _toggleDisplay() {
        this.display = !this.display;
    }

    @action _setModalProps(props) {
        this.modalProps = props;
    }

    @action _setDisabled(key) {        
        this.disabled[key] = true;
    }

    @action _setEnabled(key) {
        this.disabled[key] = false;
    }

    toggleDisplay(props) {
        this.display ? this._setModalProps(null) : this._setModalProps(props);
        this._toggleDisplay();
    }

    setDisabled(key) {
        this._setDisabled(key)
    }

    setEnabled(key) {
        this._setEnabled(key)
    }

}

const ModalStore = new ModalObservableStore();
export default ModalStore
