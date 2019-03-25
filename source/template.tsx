/**
 * Copyright (C) 2018 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';
import * as DOM from '@singleware/jsx';
import * as Control from '@singleware/ui-control';

import { Properties } from './properties';
import { Element } from './element';
import { States } from './states';

/**
 * Switch template class.
 */
@Class.Describe()
export class Template extends Control.Component<Properties> {
  /**
   * Switch states.
   */
  @Class.Private()
  private states = {
    name: '',
    checkedValue: 'on',
    uncheckedValue: 'off'
  } as States;

  /**
   * Input element.
   */
  @Class.Private()
  private input = <input type="checkbox" /> as HTMLInputElement;

  /**
   * Yes mark element.
   */
  @Class.Private()
  private yesMarkSlot = <slot name="yes" class="mark yes" /> as HTMLSlotElement;

  /**
   * No mark element.
   */
  @Class.Private()
  private noMarkSlot = <slot name="no" class="mark no" /> as HTMLSlotElement;

  /**
   * Switch slider element.
   */
  @Class.Private()
  private slider = (
    <div class="slider">
      {this.yesMarkSlot}
      {this.noMarkSlot}
    </div>
  ) as HTMLDivElement;

  /**
   * Switch element.
   */
  @Class.Private()
  private switch = (
    <label class="switch">
      {this.input}
      {this.slider}
    </label>
  ) as HTMLLabelElement;

  /**
   * Switch styles.
   */
  @Class.Private()
  private styles = (
    <style>
      {`:host > .switch > input {
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
}`}
    </style>
  ) as HTMLStyleElement;

  /**
   * Switch skeleton.
   */
  @Class.Private()
  private skeleton = (
    <div slot={this.properties.slot} class={this.properties.class}>
      {this.children}
    </div>
  ) as Element;

  /**
   * Updates the specified property state.
   * @param property Property name.
   * @param state Property state.
   */
  @Class.Private()
  private updatePropertyState(property: string, state: boolean): void {
    if (state) {
      this.skeleton.dataset[property] = 'on';
    } else {
      delete this.skeleton.dataset[property];
    }
  }

  /**
   * Click event handler.
   * @param event Event information.
   */
  @Class.Private()
  private clickHandler(event: Event): void {
    if (this.input.readOnly) {
      event.preventDefault();
    } else if (this.group) {
      const last = Template.groups[this.group];
      if (last !== this.skeleton) {
        if (last) {
          last.checked = false;
          Template.notifyChanges(last);
        }
        this.updatePropertyState('checked', (this.input.checked = true));
        Template.groups[this.group] = this.skeleton;
        Template.notifyChanges(this.skeleton);
      }
    } else {
      this.updatePropertyState('checked', this.input.checked);
      Template.notifyChanges(this.skeleton);
    }
  }

  /**
   * Bind event handlers to update the custom element.
   */
  @Class.Private()
  private bindHandlers(): void {
    this.input.addEventListener('click', this.clickHandler.bind(this));
  }

  /**
   * Bind exposed properties to the custom element.
   */
  @Class.Private()
  private bindProperties(): void {
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
  @Class.Private()
  private assignProperties(): void {
    this.assignComponentProperties(this.properties, [
      'name',
      'group',
      'checkedValue',
      'uncheckedValue',
      'value',
      'checked',
      'defaultValue',
      'defaultChecked',
      'required',
      'readOnly',
      'disabled'
    ]);
  }

  /**
   * Default constructor.
   * @param properties Select properties.
   * @param children Select children.
   */
  constructor(properties?: Properties, children?: any[]) {
    super(properties, children);
    DOM.append(this.skeleton.attachShadow({ mode: 'closed' }), this.styles, this.switch);
    this.bindHandlers();
    this.bindProperties();
    this.assignProperties();
  }

  /**
   * Get switch name.
   */
  @Class.Public()
  public get name(): string {
    return this.states.name;
  }

  /**
   * Set switch name.
   */
  public set name(name: string) {
    this.states.name = name;
  }

  /**
   * Get switch group.
   */
  @Class.Public()
  public get group(): string {
    return this.input.name;
  }

  /**
   * Set switch group.
   */
  public set group(name: string) {
    this.input.name = name;
  }

  /**
   * Get switch value.
   */
  @Class.Public()
  public get value(): any {
    return this.checked ? this.states.checkedValue : this.states.uncheckedValue;
  }

  /**
   * Set switch value.
   */
  public set value(value: any) {
    this.checked = this.states.checkedValue === value;
  }

  /**
   * Get checked state.
   */
  @Class.Public()
  public get checked(): boolean {
    return this.input.checked;
  }

  /**
   * Set checked state.
   */
  public set checked(state: boolean) {
    if (this.group) {
      const last = Template.groups[this.group];
      if (state) {
        if (last && last !== this.skeleton) {
          last.checked = false;
        }
        Template.groups[this.group] = this.skeleton;
      } else if (last === this.skeleton) {
        Template.groups[this.group] = void 0;
      }
    }
    this.updatePropertyState('checked', (this.input.checked = state));
  }

  /**
   * Gets the default switch value.
   */
  @Class.Public()
  public get defaultValue(): any {
    return this.input.defaultValue;
  }

  /**
   * Sets the default switch value.
   */
  public set defaultValue(value: any) {
    this.input.defaultValue = value;
  }

  /**
   * Gets the default checked state.
   */
  @Class.Public()
  public get defaultChecked(): boolean {
    return this.input.defaultChecked;
  }

  /**
   * Sets the default checked state.
   */
  public set defaultChecked(value: boolean) {
    this.input.defaultChecked = value;
  }

  /**
   * Get required state.
   */
  @Class.Public()
  public get required(): boolean {
    return this.input.required;
  }

  /**
   * Set required state.
   */
  public set required(state: boolean) {
    this.input.required = state;
    this.updatePropertyState('required', state);
  }

  /**
   * Get read-only state.
   */
  @Class.Public()
  public get readOnly(): boolean {
    return this.input.readOnly;
  }

  /**
   * Set read-only state.
   */
  public set readOnly(state: boolean) {
    this.input.readOnly = state;
    this.updatePropertyState('readonly', state);
  }

  /**
   * Get disabled state.
   */
  @Class.Public()
  public get disabled(): boolean {
    return this.input.disabled;
  }

  /**
   * Set disabled state.
   */
  public set disabled(state: boolean) {
    this.input.disabled = state;
    this.updatePropertyState('disabled', state);
  }

  /**
   * Gets the checked state value.
   */
  @Class.Public()
  public get checkedValue(): any {
    return this.states.checkedValue;
  }

  /**
   * Sets the checked state value.
   */
  public set checkedValue(value: any) {
    this.states.checkedValue = value;
  }

  /**
   * Gets the unchecked state value.
   */
  @Class.Public()
  public get uncheckedValue(): any {
    return this.states.uncheckedValue;
  }

  /**
   * Sets the unchecked state value.
   */
  public set uncheckedValue(value: any) {
    this.states.uncheckedValue = value;
  }

  /**
   * Switch element.
   */
  @Class.Public()
  public get element(): Element {
    return this.skeleton;
  }

  /**
   * Reset the switch to its initial value and state.
   */
  @Class.Public()
  public reset(): void {
    this.value = this.defaultValue;
    this.checked = this.defaultChecked;
  }

  /**
   * Switch groups.
   */
  @Class.Private()
  private static groups = {} as any;

  /**
   * Notify element changes.
   */
  @Class.Private()
  private static notifyChanges(element: Element): void {
    if (document.body.contains(element)) {
      element.dispatchEvent(new Event('change', { bubbles: true, cancelable: false }));
    }
  }
}
