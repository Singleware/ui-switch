"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Template_1;
"use strict";
/**
 * Copyright (C) 2018 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
const Class = require("@singleware/class");
const DOM = require("@singleware/jsx");
const Control = require("@singleware/ui-control");
/**
 * Switch template class.
 */
let Template = Template_1 = class Template extends Control.Component {
    /**
     * Default constructor.
     * @param properties Select properties.
     * @param children Select children.
     */
    constructor(properties, children) {
        super(properties, children);
        /**
         * Switch states.
         */
        this.states = {
            name: '',
            checkedValue: 'on',
            uncheckedValue: 'off'
        };
        /**
         * Input element.
         */
        this.input = DOM.create("input", { type: "checkbox" });
        /**
         * Yes mark element.
         */
        this.yesMarkSlot = DOM.create("slot", { name: "yes", class: "mark yes" });
        /**
         * No mark element.
         */
        this.noMarkSlot = DOM.create("slot", { name: "no", class: "mark no" });
        /**
         * Switch slider element.
         */
        this.slider = (DOM.create("div", { class: "slider" },
            this.yesMarkSlot,
            this.noMarkSlot));
        /**
         * Switch element.
         */
        this.switch = (DOM.create("label", { class: "switch" },
            this.input,
            this.slider));
        /**
         * Switch styles.
         */
        this.styles = (DOM.create("style", null, `:host > .switch > input {
  position: absolute;
  opacity: 0;
}
:host > .switch > input:not([disabled]):not([readonly]) ~ .slider {
  cursor: pointer;
}
:host > .switch > .slider {
  overflow: hidden;
  white-space: nowrap;
  user-select: none;
}
:host > .switch > .slider > .mark {
  position: relative;
  display: inline-block;
  min-width: 1em;
  width: 100%;
}
:host > .switch > .slider > .yes {
  text-align: left;
  margin-left: -100%;
}
:host > .switch > .slider > .no {
  text-align: right;
}
:host > .switch > .slider > .no::slotted(*) {
  padding-right: 1rem;
}
:host > .switch > .slider > .no::slotted(*):before {
  content: '';
  position: absolute;
  display: inline-block;
  width: 1.25em;
  bottom: 0.25rem;
  top: 0.25rem;
  left: 0.25rem;
  border: 0.0625rem solid black;
  border-radius: 50%;
}
:host > .switch > input:checked ~ .slider > .yes {
  margin-left: 0;
}
:host > .switch > input:checked ~ .slider > .yes::slotted(*) {
  padding-left: 1rem;
}
:host > .switch > input:checked ~ .slider > .no::slotted(*):before {
  left: auto;
  right: 100%;
  margin-right: 0.25rem;
}`));
        /**
         * Switch skeleton.
         */
        this.skeleton = (DOM.create("div", { slot: this.properties.slot, class: this.properties.class }, this.children));
        DOM.append(this.skeleton.attachShadow({ mode: 'closed' }), this.styles, this.switch);
        this.bindHandlers();
        this.bindProperties();
        this.assignProperties();
    }
    /**
     * Updates the specified property state.
     * @param property Property name.
     * @param state Property state.
     */
    updatePropertyState(property, state) {
        if (state) {
            this.skeleton.dataset[property] = 'on';
        }
        else {
            delete this.skeleton.dataset[property];
        }
    }
    /**
     * Click event handler.
     * @param event Event information.
     */
    clickHandler(event) {
        if (this.input.readOnly) {
            event.preventDefault();
        }
        else if (this.group) {
            const last = Template_1.groups[this.group];
            if (last !== this.skeleton) {
                if (last) {
                    last.checked = false;
                    Template_1.notifyChanges(last);
                }
                this.updatePropertyState('checked', (this.input.checked = true));
                Template_1.groups[this.group] = this.skeleton;
                Template_1.notifyChanges(this.skeleton);
            }
        }
        else {
            this.updatePropertyState('checked', this.input.checked);
            Template_1.notifyChanges(this.skeleton);
        }
    }
    /**
     * Bind event handlers to update the custom element.
     */
    bindHandlers() {
        this.input.addEventListener('click', this.clickHandler.bind(this));
    }
    /**
     * Bind exposed properties to the custom element.
     */
    bindProperties() {
        this.bindComponentProperties(this.skeleton, [
            'name',
            'group',
            'value',
            'checked',
            'defaultValue',
            'defaultChecked',
            'required',
            'readOnly',
            'disabled',
            'checkedValue',
            'uncheckedValue',
            'reset'
        ]);
    }
    /**
     * Assign all element properties.
     */
    assignProperties() {
        this.assignComponentProperties(this.properties, [
            'name',
            'group',
            'value',
            'checked',
            'defaultValue',
            'defaultChecked',
            'required',
            'readOnly',
            'disabled',
            'checkedValue',
            'uncheckedValue'
        ]);
    }
    /**
     * Get switch name.
     */
    get name() {
        return this.states.name;
    }
    /**
     * Set switch name.
     */
    set name(name) {
        this.states.name = name;
    }
    /**
     * Get switch group.
     */
    get group() {
        return this.input.name;
    }
    /**
     * Set switch group.
     */
    set group(name) {
        this.input.name = name;
    }
    /**
     * Get switch value.
     */
    get value() {
        return this.checked ? this.states.checkedValue : this.states.uncheckedValue;
    }
    /**
     * Set switch value.
     */
    set value(value) {
        this.checked = this.states.checkedValue === value;
    }
    /**
     * Get checked state.
     */
    get checked() {
        return this.input.checked;
    }
    /**
     * Set checked state.
     */
    set checked(state) {
        if (this.group) {
            const last = Template_1.groups[this.group];
            if (state) {
                if (last && last !== this.skeleton) {
                    last.checked = false;
                }
                Template_1.groups[this.group] = this.skeleton;
            }
            else if (last === this.skeleton) {
                Template_1.groups[this.group] = void 0;
            }
        }
        this.updatePropertyState('checked', (this.input.checked = state));
    }
    /**
     * Gets the default switch value.
     */
    get defaultValue() {
        return this.input.defaultValue;
    }
    /**
     * Sets the default switch value.
     */
    set defaultValue(value) {
        this.input.defaultValue = value;
    }
    /**
     * Gets the default checked state.
     */
    get defaultChecked() {
        return this.input.defaultChecked;
    }
    /**
     * Sets the default checked state.
     */
    set defaultChecked(value) {
        this.input.defaultChecked = value;
    }
    /**
     * Get required state.
     */
    get required() {
        return this.input.required;
    }
    /**
     * Set required state.
     */
    set required(state) {
        this.input.required = state;
        this.updatePropertyState('required', state);
    }
    /**
     * Get read-only state.
     */
    get readOnly() {
        return this.input.readOnly;
    }
    /**
     * Set read-only state.
     */
    set readOnly(state) {
        this.input.readOnly = state;
        this.updatePropertyState('readonly', state);
    }
    /**
     * Get disabled state.
     */
    get disabled() {
        return this.input.disabled;
    }
    /**
     * Set disabled state.
     */
    set disabled(state) {
        this.input.disabled = state;
        this.updatePropertyState('disabled', state);
    }
    /**
     * Gets the checked state value.
     */
    get checkedValue() {
        return this.states.checkedValue;
    }
    /**
     * Sets the checked state value.
     */
    set checkedValue(value) {
        this.states.checkedValue = value;
    }
    /**
     * Gets the unchecked state value.
     */
    get uncheckedValue() {
        return this.states.uncheckedValue;
    }
    /**
     * Sets the unchecked state value.
     */
    set uncheckedValue(value) {
        this.states.uncheckedValue = value;
    }
    /**
     * Switch element.
     */
    get element() {
        return this.skeleton;
    }
    /**
     * Reset the switch to its initial value and state.
     */
    reset() {
        this.value = this.defaultValue;
        this.checked = this.defaultChecked;
    }
    /**
     * Notify element changes.
     */
    static notifyChanges(element) {
        if (document.body.contains(element)) {
            element.dispatchEvent(new Event('change', { bubbles: true, cancelable: false }));
        }
    }
};
/**
 * Switch groups.
 */
Template.groups = {};
__decorate([
    Class.Private()
], Template.prototype, "states", void 0);
__decorate([
    Class.Private()
], Template.prototype, "input", void 0);
__decorate([
    Class.Private()
], Template.prototype, "yesMarkSlot", void 0);
__decorate([
    Class.Private()
], Template.prototype, "noMarkSlot", void 0);
__decorate([
    Class.Private()
], Template.prototype, "slider", void 0);
__decorate([
    Class.Private()
], Template.prototype, "switch", void 0);
__decorate([
    Class.Private()
], Template.prototype, "styles", void 0);
__decorate([
    Class.Private()
], Template.prototype, "skeleton", void 0);
__decorate([
    Class.Private()
], Template.prototype, "updatePropertyState", null);
__decorate([
    Class.Private()
], Template.prototype, "clickHandler", null);
__decorate([
    Class.Private()
], Template.prototype, "bindHandlers", null);
__decorate([
    Class.Private()
], Template.prototype, "bindProperties", null);
__decorate([
    Class.Private()
], Template.prototype, "assignProperties", null);
__decorate([
    Class.Public()
], Template.prototype, "name", null);
__decorate([
    Class.Public()
], Template.prototype, "group", null);
__decorate([
    Class.Public()
], Template.prototype, "value", null);
__decorate([
    Class.Public()
], Template.prototype, "checked", null);
__decorate([
    Class.Public()
], Template.prototype, "defaultValue", null);
__decorate([
    Class.Public()
], Template.prototype, "defaultChecked", null);
__decorate([
    Class.Public()
], Template.prototype, "required", null);
__decorate([
    Class.Public()
], Template.prototype, "readOnly", null);
__decorate([
    Class.Public()
], Template.prototype, "disabled", null);
__decorate([
    Class.Public()
], Template.prototype, "checkedValue", null);
__decorate([
    Class.Public()
], Template.prototype, "uncheckedValue", null);
__decorate([
    Class.Public()
], Template.prototype, "element", null);
__decorate([
    Class.Public()
], Template.prototype, "reset", null);
__decorate([
    Class.Private()
], Template, "groups", void 0);
__decorate([
    Class.Private()
], Template, "notifyChanges", null);
Template = Template_1 = __decorate([
    Class.Describe()
], Template);
exports.Template = Template;
