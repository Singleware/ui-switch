/**
 * Copyright (C) 2018 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */

/**
 * Switch properties interface.
 */
export interface Properties {
  /**
   * Switch classes.
   */
  class?: string;
  /**
   * Switch slot.
   */
  slot?: string;
  /**
   * Switch name.
   */
  name?: string;
  /**
   * Switch group.
   */
  group?: string;
  /**
   * Switch value.
   */
  value?: any;
  /**
   * Determines whether the switch is checked or not.
   */
  checked?: boolean;
  /**
   * Determines whether the switch is required or not.
   */
  required?: boolean;
  /**
   * Determines whether the switch is read-only or not.
   */
  readOnly?: boolean;
  /**
   * Determines whether the switch is disabled or not.
   */
  disabled?: boolean;
  /**
   * Determines whether the switch must return status or value.
   */
  statusOnly?: boolean;
  /**
   * Switch children.
   */
  children?: {};
}
