// (C) 2021 GoodData Corporation

import * as Navigation from "../../tools/navigation";
import { TopBar, Dashboard } from "../../tools/dashboards";
import { Api } from "../../tools/api";
import { ShareDialog } from "../../tools/shareDialog";
import { getProjectId } from "../../support/constants";
import { Users } from "../../tools/users";
import { DashboardAccess, WorkspaceAccess } from "../../tools/permissions";
import { Dashboards } from "../../../reference_workspace/workspace_objects/goodsales/current_reference_workspace_objects_tiger";

Cypress.on("uncaught:exception", (error) => {
    // eslint-disable-next-line no-console
    console.error("Uncaught excepton cause", error);
    return false;
});

Cypress.Cookies.debug(true);

describe("Dashboard", { tags: ["post-merge_integrated_tiger"] }, () => {
    describe("Basic case", () => {
        beforeEach(() => {
            cy.login();
            Users.switchToDefaultUser();
            Api.setEarlyAccess(getProjectId(), "develop");

            Navigation.visit("dashboard/dashboard-tiger-permissions");
        });

        it("should render topBar with share button", () => {
            new TopBar().enterSharing();
            new ShareDialog().dialogExists(true).addButtonIsActive();
        });
    });
    describe("Basic viewer case", () => {
        const username = "test-viewer";
        const groupname = "test-viewers";

        function deleteUserAndGroup(user: string, group: string) {
            Users.deleteUser(user);
            Users.deleteGroup(group);
        }

        beforeEach(() => {
            cy.login();
            Users.switchToDefaultUser();
            Api.setEarlyAccess(getProjectId(), "develop");

            deleteUserAndGroup(username, groupname);
            Users.createGroup(groupname);
            Users.createUser(username, [groupname]);
            WorkspaceAccess.assignUserPermissionToWorkspace(getProjectId(), [
                { user: username, permission: "VIEW" },
            ]);
            DashboardAccess.assignUserPermissionToDashboard(
                getProjectId(),
                Dashboards.KPIs,
                username,
                "VIEW",
            );
        });

        afterEach(() => {
            Users.switchToDefaultUser();
            deleteUserAndGroup(username, groupname);
        });

        it("should not show sharing for user who is only viewer", () => {
            Users.switchToUser(username);
            Navigation.visit("dashboard/dashboard-tiger-permissions");

            const dashboard = new Dashboard();
            dashboard.topBarExist();
            const topBar = new TopBar();
            topBar.shareButtonExists(false);
        });

        it("should show sharing for user who is viewer but got permission to share", () => {
            Navigation.visit("dashboard/dashboard-tiger-permissions");

            // share the dashboard with viewer user
            new TopBar().enterSharing();

            new ShareDialog()
                .dialogExists(true)
                .addButtonIsActive()
                .setPermission(username, "Can view & share")
                .save();

            // check that viewer can share
            Users.switchToUser(username);
            Navigation.visit("dashboard/dashboard-tiger-permissions");

            const dashboard = new Dashboard();
            dashboard.topBarExist();
            new TopBar().shareButtonExists(true);
        });

        it("should show sharing for user who is viewer but got permission to share via group", () => {
            DashboardAccess.assignGroupPermissionToDashboard(
                getProjectId(),
                Dashboards.KPIs,
                groupname,
                "SHARE",
            );
            Users.switchToUser(username);
            Navigation.visit("dashboard/dashboard-tiger-permissions");

            new Dashboard().topBarExist();
            new TopBar().shareButtonExists(true);
        });

        it("should be able to remove person from sharing list and that person should no longer be able to access", () => {
            Navigation.visit("dashboard/dashboard-tiger-permissions");
            const topBar = new TopBar();
            topBar.enterSharing();

            const shareDialog = new ShareDialog();
            shareDialog.dialogExists(true).addButtonIsActive().remove(username).save();

            topBar.enterSharing();
            shareDialog.isEmpty().cancel();

            // check that the user cannot access
            Users.switchToUser(username);
            Navigation.visit("dashboard/dashboard-tiger-permissions");

            new Dashboard().hasError();
        });

        it("should not allow users who have share permission to raise their permissions to edit", () => {
            DashboardAccess.assignUserPermissionToDashboard(
                getProjectId(),
                Dashboards.KPIs,
                username,
                "SHARE",
            );
            Users.switchToUser(username);
            Navigation.visit("dashboard/dashboard-tiger-permissions");
            new TopBar().enterSharing();

            const shareDialog = new ShareDialog();
            shareDialog.openDropdownForUserOrGroup(username).isPermissionDisabled("Can edit & share");
        });

        it("should not allow members of group who have share permission to raise permissions to edit", () => {
            DashboardAccess.assignGroupPermissionToDashboard(
                getProjectId(),
                Dashboards.KPIs,
                groupname,
                "SHARE",
            );
            Users.switchToUser(username);
            Navigation.visit("dashboard/dashboard-tiger-permissions");
            new TopBar().enterSharing();

            const shareDialog = new ShareDialog();
            shareDialog.openDropdownForUserOrGroup(username).isPermissionDisabled("Can edit & share");
        });
    });

    describe("Basic multiple groups/users case", () => {
        const firstUser = "test-viewer-1";
        const firstGroup = "test-viewers-1";
        const secondUser = "test-viewer-2";
        const secondGroup = "test-viewers-2";

        beforeEach(() => {
            cy.login();
            Users.switchToDefaultUser();
            Api.setEarlyAccess(getProjectId(), "develop");

            Users.deleteUser(firstUser);
            Users.deleteUser(secondUser);
            Users.deleteGroup(firstGroup);
            Users.deleteGroup(secondGroup);

            Users.createGroup(firstGroup);
            Users.createGroup(secondGroup);

            // first user is part of both groups!
            Users.createUser(firstUser, [firstGroup, secondGroup]);
            Users.createUser(secondUser, [firstGroup]);

            WorkspaceAccess.assignUserPermissionToWorkspace(getProjectId(), [
                { user: firstUser, permission: "VIEW" },
                { user: secondUser, permission: "VIEW" },
            ]);
        });

        afterEach(() => {
            Users.switchToDefaultUser();
            Users.deleteUser(firstUser);
            Users.deleteUser(secondUser);
            Users.deleteGroup(firstGroup);
            Users.deleteGroup(secondGroup);
        });

        it("should correctly visualize assigned different permissions for groups", () => {
            DashboardAccess.assignGroupPermissionToDashboard(
                getProjectId(),
                Dashboards.KPIs,
                firstGroup,
                "SHARE",
            );
            DashboardAccess.assignGroupPermissionToDashboard(
                getProjectId(),
                Dashboards.KPIs,
                secondGroup,
                "VIEW",
            );

            Users.switchToUser(firstUser);
            Navigation.visit("dashboard/dashboard-tiger-permissions");
            new TopBar().enterSharing();
            new ShareDialog()
                .dialogExists(true)
                .hasPermissionSet(firstGroup, "Can view & share")
                .hasPermissionSet(secondGroup, "Can view");
        });

        it("should correctly visualize user & group permissions", () => {
            DashboardAccess.assignGroupPermissionToDashboard(
                getProjectId(),
                Dashboards.KPIs,
                firstGroup,
                "SHARE",
            );
            DashboardAccess.assignUserPermissionToDashboard(
                getProjectId(),
                Dashboards.KPIs,
                firstUser,
                "SHARE",
            );

            Users.switchToUser(firstUser);
            Navigation.visit("dashboard/dashboard-tiger-permissions");
            new TopBar().enterSharing();
            new ShareDialog()
                .dialogExists(true)
                .hasPermissionSet(firstGroup, "Can view & share")
                .hasPermissionSet(firstUser, "Can view & share");

            // cannot raise permissions but also cannot lower permissions as
            // share is already implied by group membership
            new ShareDialog()
                .openDropdownForUserOrGroup(firstUser)
                .isPermissionDisabled("Can edit & share")
                .isPermissionDisabled("Can view");
        });
    });
});
