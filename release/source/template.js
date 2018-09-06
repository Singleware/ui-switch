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
     * @param properties Checkbox properties.
     * @param children Checkbox children.
     */
    constructor(properties, children) {
        super(properties, children);
        /**
         * Switch states.
         */
        this.states = {
            name: ''
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
        /**
         * Switch elements.
         */
        this.elements = DOM.append(this.skeleton.attachShadow({ mode: 'closed' }), this.styles, this.switch);
        this.bindHandlers();
        this.bindProperties();
        this.assignProperties();
    }
    /**
     * Enable or disable the specified property in this elements.
     * @param property Property name.
     * @param state Determines whether the property must be enabled or disabled.
     */
    setDataProperty(property, state) {
        if (state) {
            this.skeleton.dataset[property] = 'on';
        }
        else {
            delete this.skeleton.dataset[property];
        }
    }
    /**
     * Toggles this switch by the last toggled switch.
     * @param force Determines whether the same switch must be unchecked.
     * @returns Returns the last switch or undefined when there is no last switch.
     */
    toggleSwitch(force) {
        const last = Template_1.groups[this.group];
        if (last === this.skeleton) {
            if (force) {
                Template_1.groups[this.group] = void 0;
            }
        }
        else {
            if (last) {
                last.checked = false;
            }
            Template_1.groups[this.group] = this.skeleton;
        }
        return last;
    }
    /**
     * Click event handler.
     * @param event Event information.
     */
    clickHandler(event) {
        if (this.input.readOnly) {
            event.preventDefault();
        }
        else {
            if (this.group) {
                const last = this.toggleSwitch(!this.checked);
                if (last && last !== this.skeleton) {
                    Template_1.notifyChanges(last);
                }
            }
            this.setDataProperty('checked', this.input.checked);
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
        Object.defineProperties(this.skeleton, {
            name: super.bindDescriptor(this, Template_1.prototype, 'name'),
            group: super.bindDescriptor(this, Template_1.prototype, 'group'),
            value: super.bindDescriptor(this, Template_1.prototype, 'value'),
            checked: super.bindDescriptor(this, Template_1.prototype, 'checked'),
            required: super.bindDescriptor(this, Template_1.prototype, 'required'),
            readOnly: super.bindDescriptor(this, Template_1.prototype, 'readOnly'),
            disabled: super.bindDescriptor(this, Template_1.prototype, 'disabled')
        });
    }
    /**
     * Assign all element properties.
     */
    assignProperties() {
        Control.assignProperties(this, this.properties, ['name', 'group', 'value', 'checked', 'required', 'readOnly', 'disabled']);
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
        return this.checked ? this.input.value : void 0;
    }
    /**
     * Set switch value.
     */
    set value(value) {
        this.input.value = value;
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
        this.setDataProperty('checked', state);
        this.input.checked = state;
        if (this.group) {
            this.toggleSwitch(false);
        }
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
        this.setDataProperty('required', state);
        this.input.required = state;
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
        this.setDataProperty('readonly', state);
        this.input.readOnly = state;
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
        this.setDataProperty('disabled', state);
        this.input.disabled = state;
    }
    /**
     * Switch element.
     */
    get element() {
        return this.skeleton;
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
], Template.prototype, "elements", void 0);
__decorate([
    Class.Protected()
], Template.prototype, "setDataProperty", null);
__decorate([
    Class.Private()
], Template.prototype, "toggleSwitch", null);
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
], Template.prototype, "required", null);
__decorate([
    Class.Public()
], Template.prototype, "readOnly", null);
__decorate([
    Class.Public()
], Template.prototype, "disabled", null);
__decorate([
    Class.Public()
], Template.prototype, "element", null);
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
