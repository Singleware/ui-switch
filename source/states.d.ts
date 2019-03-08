/**
 * Copyright (C) 2018 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */

/**
 * Switch states interface.
 */
export interface States {
  /**
   * Switch name.
   */
  name: string;
  /**
   * Value returned when the switch is checked.
   */
  checkedValue: any;
  /**
   * Value returned when the switch isn't checked.
   */
  uncheckedValue: any;
}
