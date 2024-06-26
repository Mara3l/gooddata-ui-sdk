// (C) 2024 GoodData Corporation
import {
    DimensionItem,
    IAttribute,
    IAttributeOrMeasure,
    IBucket,
    IDimension,
    MeasureGroupIdentifier,
    bucketAttributes,
    bucketMeasures,
    bucketsFind,
    newBucket,
    newDimension,
} from "@gooddata/sdk-model";
import { BucketNames } from "@gooddata/sdk-ui";

/**
 * Constructs repeater buckets from the provided attributes and measures.
 *
 * @internal
 */
export function constructRepeaterBuckets(
    rowAttribute: IAttribute,
    columns: IAttributeOrMeasure[],
    viewBy?: IAttribute,
) {
    return [
        newBucket(BucketNames.ATTRIBUTE, rowAttribute as IAttribute),
        newBucket(BucketNames.COLUMNS, ...(columns as IAttributeOrMeasure[])),
        viewBy ? newBucket(BucketNames.VIEW, viewBy as IAttribute) : undefined,
    ].filter(Boolean);
}

/**
 * Constructs repeater execution dimensions from the provided buckets.
 *
 * @internal
 */
export function constructRepeaterDimensions(buckets: IBucket[]): IDimension[] {
    // Row attribute
    const rowAttributeBucket = bucketsFind(buckets, BucketNames.ATTRIBUTE);
    const rowAttributeBucketAttributes = rowAttributeBucket ? bucketAttributes(rowAttributeBucket) : [];
    const rowAttribute = rowAttributeBucketAttributes[0];

    // Columns (row attribute display forms + visualization measures)
    const columnsBucket = bucketsFind(buckets, BucketNames.COLUMNS);
    let columnBucketMeasures: IAttributeOrMeasure[] = [];
    let columnBucketAttributes: IAttribute[] = [];
    if (columnsBucket) {
        columnBucketMeasures = columnsBucket ? bucketMeasures(columnsBucket) : [];
        columnBucketAttributes = columnsBucket ? bucketAttributes(columnsBucket) : [];
    }

    // Slice by attribute
    const viewBucket = bucketsFind(buckets, BucketNames.VIEW);
    let viewBucketAttributes: IAttribute[] = [];
    let viewAttribute: IAttribute | undefined;
    if (viewBucket) {
        viewBucketAttributes = bucketAttributes(viewBucket);
        viewAttribute = viewBucketAttributes[0];
    }

    const dimensions: DimensionItem[][] = [[rowAttribute, ...columnBucketAttributes]];

    if (viewAttribute || columnBucketMeasures.length > 0) {
        dimensions.push([]);
    }

    if (viewAttribute) {
        dimensions[1].push(viewAttribute);
    }

    if (columnBucketMeasures.length > 0) {
        dimensions[1].push(MeasureGroupIdentifier);
    }

    return dimensions.map((d) => newDimension(d));
}
