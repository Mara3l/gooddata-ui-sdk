// (C) 2019 GoodData Corporation
import { IAttribute } from "../attribute";
import { Identifier } from "../base";
import { IMeasure } from "../measure";

/**
 * TODO: SDK8: Add docs
 *
 * @public
 */
export type AttributeOrMeasure = IMeasure | IAttribute;

/**
 * TODO: SDK8: Add docs
 *
 * @public
 */
export interface IBucket {
    localIdentifier?: Identifier;
    items: AttributeOrMeasure[];
}
