/**
 * Copyright (C) 2018 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */

/**
 * Switch element interface.
 */
export interface Element extends HTMLDivElement {
  /**
   * Switch name.
   */
  name: string;
  /**
   * Switch group.
   */
  group: string;
  /**
   * Switch value.
   */
  value: any;
  /**
   * Switch state.
   */
  checked: boolean;
  /**
   * Required state.
   */
  required: boolean;
  /**
   * Read-only state.
   */
  readOnly: boolean;
  /**
   * Disabled state.
   */
  disabled: boolean;
}
