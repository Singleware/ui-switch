import * as Control from '@singleware/ui-control';
import { Properties } from './properties';
import { Element } from './element';
/**
 * Switch template class.
 */
export declare class Template extends Control.Component<Properties> {
    /**
     * Switch states.
     */
    private states;
    /**
     * Input element.
     */
    private input;
    /**
     * Yes mark element.
     */
    private yesMarkSlot;
    /**
     * No mark element.
     */
    private noMarkSlot;
    /**
     * Switch slider element.
     */
    private slider;
    /**
     * Switch element.
     */
    private switch;
    /**
     * Switch styles.
     */
    private styles;
    /**
     * Switch skeleton.
     */
    private skeleton;
    /**
     * Switch elements.
     */
    private elements;
    /**
     * Enable or disable the specified property in this elements.
     * @param property Property name.
     * @param state Determines whether the property must be enabled or disabled.
     */
    protected setDataProperty(property: string, state: boolean): void;
    /**
     * Toggles this switch by the last toggled switch.
     * @param force Determines whether the same switch must be unchecked.
     * @returns Returns the last switch or undefined when there is no last switch.
     */
    private toggleSwitch;
    /**
     * Click event handler.
     * @param event Event information.
     */
    private clickHandler;
    /**
     * Bind event handlers to update the custom element.
     */
    private bindHandlers;
    /**
     * Bind exposed properties to the custom element.
     */
    private bindProperties;
    /**
     * Assign all element properties.
     */
    private assignProperties;
    /**
     * Default constructor.
     * @param properties Checkbox properties.
     * @param children Checkbox children.
     */
    constructor(properties?: Properties, children?: any[]);
    /**
     * Get switch name.
     */
    /**
    * Set switch name.
    */
    name: string;
    /**
     * Get switch group.
     */
    /**
    * Set switch group.
    */
    group: string;
    /**
     * Get switch value.
     */
    /**
    * Set switch value.
    */
    value: any;
    /**
     * Get checked state.
     */
    /**
    * Set checked state.
    */
    checked: boolean;
    /**
     * Get required state.
     */
    /**
    * Set required state.
    */
    required: boolean;
    /**
     * Get read-only state.
     */
    /**
    * Set read-only state.
    */
    readOnly: boolean;
    /**
     * Get disabled state.
     */
    /**
    * Set disabled state.
    */
    disabled: boolean;
    /**
     * Switch element.
     */
    readonly element: Element;
    /**
     * Switch groups.
     */
    private static groups;
    /**
     * Notify element changes.
     */
    private static notifyChanges;
}
