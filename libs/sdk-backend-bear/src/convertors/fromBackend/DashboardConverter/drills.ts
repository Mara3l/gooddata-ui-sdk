// (C) 2019-2023 GoodData Corporation

import * as GdcVisualizationWidget from "@gooddata/api-model-bear/GdcVisualizationWidget";
import * as GdcKpi from "@gooddata/api-model-bear/GdcKpi";

import {
    uriRef,
    idRef,
    DrillOrigin,
    IDrillToLegacyDashboard,
    InsightDrillDefinition,
} from "@gooddata/sdk-model";
import { UnexpectedError } from "@gooddata/sdk-backend-spi";

/**
 * @internal
 */
export const convertKpiDrill = (kpi: GdcKpi.IWrappedKPI): IDrillToLegacyDashboard => {
    const { drillTo: { projectDashboard, projectDashboardTab } = {}, metric } = kpi.kpi.content;

    return {
        type: "drillToLegacyDashboard",
        origin: {
            type: "drillFromMeasure",
            measure: uriRef(metric),
        },
        target: uriRef(projectDashboard!),
        tab: projectDashboardTab!,
        transition: "in-place",
    };
};

/**
 * @internal
 */
export const convertDrillOrigin = (from: GdcVisualizationWidget.DrillFromType): DrillOrigin => {
    if (GdcVisualizationWidget.isDrillFromMeasure(from)) {
        return {
            type: "drillFromMeasure",
            measure: from.drillFromMeasure,
        };
    } else if (GdcVisualizationWidget.isDrillFromAttribute(from)) {
        return {
            type: "drillFromAttribute",
            attribute: from.drillFromAttribute,
        };
    } else {
        throw new UnexpectedError("Unable to convert unknown drill origin!");
    }
};

/**
 * @internal
 */
export const convertVisualizationWidgetDrill = (
    drill: GdcVisualizationWidget.IDrillDefinition,
): InsightDrillDefinition => {
    if (GdcVisualizationWidget.isDrillToDashboard(drill)) {
        const {
            drillToDashboard: { toDashboard, target, from },
        } = drill;
        return {
            type: "drillToDashboard",
            origin: convertDrillOrigin(from),
            target: toDashboard !== undefined ? idRef(toDashboard) : undefined,
            transition: target,
        };
    } else if (GdcVisualizationWidget.isDrillToVisualization(drill)) {
        const {
            drillToVisualization: { toVisualization, target, from },
        } = drill;
        return {
            type: "drillToInsight",
            origin: convertDrillOrigin(from),
            target: uriRef(toVisualization.uri),
            transition: target,
        };
    } else if (GdcVisualizationWidget.isDrillToCustomUrl(drill)) {
        const {
            drillToCustomUrl: { target, customUrl, from },
        } = drill;
        return {
            type: "drillToCustomUrl",
            origin: convertDrillOrigin(from),
            target: {
                url: customUrl,
            },
            transition: target,
        };
    } else if (GdcVisualizationWidget.isDrillToAttributeUrl(drill)) {
        const {
            drillToAttributeUrl: { drillToAttributeDisplayForm, insightAttributeDisplayForm, target, from },
        } = drill;
        return {
            type: "drillToAttributeUrl",
            origin: convertDrillOrigin(from),
            target: {
                displayForm: uriRef(insightAttributeDisplayForm.uri),
                hyperlinkDisplayForm: uriRef(drillToAttributeDisplayForm.uri),
            },
            transition: target,
        };
    }

    throw new UnexpectedError("Unable to convert unknown drill!");
};
