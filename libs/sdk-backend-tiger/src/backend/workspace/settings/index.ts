// (C) 2019-2020 GoodData Corporation
import { IWorkspaceSettings, IWorkspaceSettingsService } from "@gooddata/sdk-backend-spi";
import { TigerAuthenticatedCallGuard } from "../../../types";

export class TigerWorkspaceSettings implements IWorkspaceSettingsService {
    constructor(private readonly authCall: TigerAuthenticatedCallGuard, public readonly workspace: string) {}

    public query(): Promise<IWorkspaceSettings> {
        return this.authCall(async () => {
            return {
                workspace: this.workspace,
            };
        });
    }
}
