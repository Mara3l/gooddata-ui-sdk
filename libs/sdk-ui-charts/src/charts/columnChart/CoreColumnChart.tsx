// (C) 2007-2022 GoodData Corporation
import React from "react";
import { BaseChart } from "../_base/BaseChart.js";
import { ICoreChartProps } from "../../interfaces/index.js";

export class CoreColumnChart extends React.PureComponent<ICoreChartProps> {
    public render() {
        return <BaseChart type="column" {...this.props} />;
    }
}
