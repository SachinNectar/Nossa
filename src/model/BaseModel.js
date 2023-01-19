import store from '../redux/store.js';
import {
    saveInstance,
    updateInstance,
    removeInstance,
    removeAll,
    saveAll,
    removeByKey
} from '../redux/actions/index.js';

export class BaseModel {
    static resource;

    constructor(props) {
        this.resource = this.constructor.resource;
        this.props = props;
    }

    static get(value) {
        const {key, uniqueIdentifier} = this.resource;
        const data = store.getState().models[key].filter((instance) => instance[uniqueIdentifier] == value);

        return data[0] || {};
    }

    static getAll() {
        return store.getState().models[this.resource.key] || [];
    }

    _save() {
        saveInstance(this.resource, this.props);
    }

    _update() {
        updateInstance(this.resource, this.props);
    }

    _delete(id) {
        removeInstance(this.resource, id);
    }

    _deleteAll() {
        removeAll(this.resource);
    }

    _saveAll(meta = {}) {
        saveAll(this.resource, this.props, meta);
    }

    _deleteByKey(id) {
        removeByKey(this.resource, id);
    }

    _updateById(id, object) {
        const {uniqueIdentifier} = this.resource;
        
        this.props = this.constructor.getAll().map((ins) => {
            if (ins[uniqueIdentifier] == id) {
                return {...ins, ...object};
            }

            return ins;
        });
        saveAll(this.resource, this.props, {});
    }
}
