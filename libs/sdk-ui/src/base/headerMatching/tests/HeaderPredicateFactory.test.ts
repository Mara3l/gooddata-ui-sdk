// (C) 2007-2022 GoodData Corporation
import * as headerPredicateFactory from "../HeaderPredicateFactory";
import {
    measureDescriptors,
    context,
    attributeHeaderItem,
    attributeDescriptor,
    workspace,
    compositeAttributeDescriptor,
} from "./HeaderPredicateFactory.fixtures";
import { attributeDisplayFormRef, measureItem, newAttribute, newMeasure, uriRef } from "@gooddata/sdk-model";
import { IAttributeDescriptor, IMeasureDescriptor } from "@gooddata/sdk-backend-spi";

describe("uriMatch", () => {
    describe("measure headers", () => {
        describe("simple measure headers", () => {
            it("should match when uri-based measure uri matches header uri", () => {
                const predicate = headerPredicateFactory.uriMatch("/uriBasedMeasureUri");

                expect(predicate(measureDescriptors.uriBasedMeasure, context)).toBe(true);
            });
            it("should match when identifier-based measure uri matches header uri", () => {
                const predicate = headerPredicateFactory.uriMatch("identifierBasedMeasureUri");

                expect(predicate(measureDescriptors.identifierBasedMeasure, context)).toBe(true);
            });

            it("should NOT match when measure uri does not match header uri", () => {
                const predicate = headerPredicateFactory.uriMatch("/someOtherUri");

                expect(predicate(measureDescriptors.uriBasedMeasure, context)).toBe(false);
            });
            it("should NOT match when measure uri is null", () => {
                // @ts-expect-error Testing possible inputs not allowed by types but possible if used from JavaScript
                const predicate = headerPredicateFactory.uriMatch(null);

                expect(predicate(measureDescriptors.uriBasedMeasure, context)).toBe(false);
            });
            it("should NOT match when measure uri is empty", () => {
                const predicate = headerPredicateFactory.uriMatch("");

                expect(predicate(measureDescriptors.uriBasedMeasure, context)).toBe(false);
            });
        });

        describe("show in % ad-hoc measure headers", () => {
            it("should match when show in % ad-hoc measure matches uri used to define measure in afm", () => {
                const predicate = headerPredicateFactory.uriMatch("/uriBasedRatioMeasureUri");

                expect(predicate(measureDescriptors.uriBasedRatioMeasure, context)).toBe(true);
            });

            it("should NOT match when show in % ad-hoc measure since identifier was used to define measure in afm and ad-hoc headers does not contain identifiers", () => {
                const predicate = headerPredicateFactory.uriMatch("/identifierBasedRatioMeasureUri");

                expect(predicate(measureDescriptors.identifierBasedRatioMeasure, context)).toBe(false);
            });
        });

        describe("ad-hoc measure headers", () => {
            it("should NOT match when ad-hoc measure is created from identifier-based attribute matching uri since uri of attribute not available in execution response or afm", () => {
                const predicate = headerPredicateFactory.uriMatch("/attributeUri");

                expect(predicate(measureDescriptors.identifierBasedAdhocMeasure, context)).toBe(false);
            });

            it("should match when ad-hoc measure is created from uri-based attribute matching uri", () => {
                const predicate = headerPredicateFactory.uriMatch("/attributeUri");

                expect(predicate(measureDescriptors.uriBasedAdhocMeasure, context)).toBe(true);
            });
        });

        describe("derived measure headers", () => {
            it("should match when uri-based PP derived measure uri matches header uri", () => {
                const predicate = headerPredicateFactory.uriMatch("/uriBasedMeasureUri");

                expect(predicate(measureDescriptors.uriBasedPPMeasure, context)).toBe(true);
            });
            it("should match when identifier-based PP derived measure uri matches header uri", () => {
                const predicate = headerPredicateFactory.uriMatch("identifierBasedMeasureUri");

                expect(predicate(measureDescriptors.identifierBasedPPMeasure, context)).toBe(true);
            });

            it("should match when uri-based SP derived measure uri matches header identifier", () => {
                const predicate = headerPredicateFactory.uriMatch("/uriBasedMeasureUri");

                expect(predicate(measureDescriptors.uriBasedSPMeasure, context)).toBe(true);
            });
            it("should match when identifier-based SP derived measure uri matches header uri", () => {
                const predicate = headerPredicateFactory.uriMatch("identifierBasedMeasureUri");

                expect(predicate(measureDescriptors.identifierBasedSPMeasure, context)).toBe(true);
            });
        });

        describe("derived show in % measure headers", () => {
            it("should match when uri-based PP derived ratio measure uri matches header uri", () => {
                const predicate = headerPredicateFactory.uriMatch("/uriBasedRatioMeasureUri");

                expect(predicate(measureDescriptors.uriBasedPPRatioMeasure, context)).toBe(true);
            });

            it("should NOT match when identifier-based PP derived ratio measure uri matches header uri since measure was defined using identifier in afm and ratio measure headers does not contain uri", () => {
                const predicate = headerPredicateFactory.uriMatch("/identifierBasedRatioMeasureUri");

                expect(predicate(measureDescriptors.identifierBasedPPRatioMeasure, context)).toBe(false);
            });

            it("should match when uri-based SP derived ratio measure uri matches header uri", () => {
                const predicate = headerPredicateFactory.uriMatch("/uriBasedRatioMeasureUri");

                expect(predicate(measureDescriptors.uriBasedSPRatioMeasure, context)).toBe(true);
            });

            it("should NOT match when identifier-based SP derived ratio measure uri matches header uri since measure was defined using identifier in afm and ration measure headers does not contain uri", () => {
                const predicate = headerPredicateFactory.uriMatch("/identifierBasedRatioMeasureUri");

                expect(predicate(measureDescriptors.identifierBasedSPRatioMeasure, context)).toBe(false);
            });
        });

        describe("AM headers", () => {
            it("should NOT match when AM uri-based operand uri matches header uri", () => {
                const predicate = headerPredicateFactory.uriMatch("/uriBasedMeasureUri");

                expect(predicate(measureDescriptors.arithmeticMeasure, context)).toBe(false);
            });
            it("should NOT match when AM identifier-based operand uri matches header uri", () => {
                const predicate = headerPredicateFactory.uriMatch("identifierBasedMeasureUri");

                expect(predicate(measureDescriptors.arithmeticMeasure, context)).toBe(false);
            });
        });
    });

    describe("attribute headers", () => {
        it("should match when measure item uri matches", () => {
            const predicate = headerPredicateFactory.uriMatch("/attributeUri");

            expect(predicate(attributeDescriptor, context)).toBe(true);
        });
        it("should NOT match when measure item uri does not match", () => {
            const predicate = headerPredicateFactory.uriMatch("/someOtherUri");

            expect(predicate(attributeDescriptor, context)).toBe(false);
        });
    });

    describe("attribute item header", () => {
        it("should match when attributeHeaderItem matches uri", () => {
            const predicate = headerPredicateFactory.uriMatch("/attributeItemUri");

            expect(predicate(attributeHeaderItem, context)).toBe(true);
        });
        it("should NOT match when attributeHeaderItem does not match uri", () => {
            const predicate = headerPredicateFactory.uriMatch("/someOtherUri");

            expect(predicate(attributeHeaderItem, context)).toBe(false);
        });
    });
});

describe("identifierMatch", () => {
    describe("measure headers", () => {
        describe("simple measure headers", () => {
            const positiveScenarios: [string, string, IMeasureDescriptor][] = [
                [
                    "uri-based measure identifier matches header identifier",
                    "uriBasedMeasureIdentifier",
                    measureDescriptors.uriBasedMeasure,
                ],
                [
                    "identifier-based measure identifier matches header identifier",
                    "identifierBasedMeasureIdentifier",
                    measureDescriptors.identifierBasedMeasure,
                ],
                [
                    "identifier-based measure identifier matches header composite identifier",
                    `${workspace}:identifierBasedMeasureIdentifier`,
                    measureDescriptors.identifierBasedMeasure,
                ],
                [
                    "composite-identifier-based measure identifier matches header identifier",
                    "compositeIdentifierId",
                    measureDescriptors.compositeIdentifierBasedMeasure,
                ],
                [
                    "composite-identifier-based measure identifier matches header composite identifier",
                    `${workspace}:compositeIdentifierId`,
                    measureDescriptors.compositeIdentifierBasedMeasure,
                ],
            ];

            it.each(positiveScenarios)("should match when %s", (_, identifier, descriptor) => {
                const predicate = headerPredicateFactory.identifierMatch(identifier);
                expect(predicate(descriptor, context)).toBe(true);
            });

            const negativeScenarios: [string, string, IMeasureDescriptor][] = [
                [
                    "measure identifier does not match header identifier",
                    "someOtherId",
                    measureDescriptors.uriBasedMeasure,
                ],
                ["measure identifier is empty", "", measureDescriptors.uriBasedMeasure],
                [
                    "identifier-based measure identifier matches header composite identifier but it is not the current workspace",
                    `some_other_${workspace}:identifierBasedMeasureIdentifier`,
                    measureDescriptors.identifierBasedMeasure,
                ],
            ];

            it.each(negativeScenarios)("should NOT match when %s", (_, identifier, descriptor) => {
                const predicate = headerPredicateFactory.identifierMatch(identifier);
                expect(predicate(descriptor, context)).toBe(false);
            });

            it("should NOT match when measure identifier is null", () => {
                // @ts-expect-error Testing possible inputs not allowed by types but possible if used from JavaScript
                const predicate = headerPredicateFactory.identifierMatch(null);
                expect(predicate(measureDescriptors.uriBasedMeasure, context)).toBe(false);
            });
        });

        describe("show in % ad-hoc measure headers", () => {
            it("should NOT match when show in % ad-hoc measure since uri was used to define measure in afm and ad-hoc headers does not contain uris", () => {
                const predicate = headerPredicateFactory.identifierMatch("uriBasedRatioMeasureIdentifier");

                expect(predicate(measureDescriptors.uriBasedRatioMeasure, context)).toBe(false);
            });

            it("should match when show in % ad-hoc measure matches identifier used to define measure in afm", () => {
                const predicate = headerPredicateFactory.identifierMatch(
                    "identifierBasedRatioMeasureIdentifier",
                );

                expect(predicate(measureDescriptors.identifierBasedRatioMeasure, context)).toBe(true);
            });
        });

        describe("ad-hoc measure headers", () => {
            it("should NOT match when ad-hoc measure is created from uri-based attribute matching identifier since identifier of attribute not available in execution response or afm", () => {
                const predicate = headerPredicateFactory.identifierMatch("uriBasedMeasureIdentifier");

                expect(predicate(measureDescriptors.uriBasedAdhocMeasure, context)).toBe(false);
            });

            it("should match when ad-hoc measure is created from identifier-based attribute matching identifier", () => {
                const predicate = headerPredicateFactory.identifierMatch("attributeIdentifier");

                expect(predicate(measureDescriptors.identifierBasedAdhocMeasure, context)).toBe(true);
            });
        });

        describe("derived measure headers", () => {
            const positiveScenarios: [string, string, IMeasureDescriptor][] = [
                [
                    "uri-based PP derived measure identifier matches header identifier",
                    "uriBasedMeasureIdentifier",
                    measureDescriptors.uriBasedPPMeasure,
                ],
                [
                    "identifier-based PP derived measure identifier matches header identifier",
                    "identifierBasedMeasureIdentifier",
                    measureDescriptors.identifierBasedPPMeasure,
                ],
                [
                    "identifier-based PP derived measure identifier matches header composite identifier",
                    `${workspace}:identifierBasedMeasureIdentifier`,
                    measureDescriptors.identifierBasedPPMeasure,
                ],
                [
                    "uri-based SP derived measure identifier matches header identifier",
                    "uriBasedMeasureIdentifier",
                    measureDescriptors.uriBasedSPMeasure,
                ],
                [
                    "identifier-based SP derived measure identifier matches header identifier",
                    "identifierBasedMeasureIdentifier",
                    measureDescriptors.identifierBasedSPMeasure,
                ],
                [
                    "identifier-based SP derived measure identifier matches header composite identifier",
                    `${workspace}:identifierBasedMeasureIdentifier`,
                    measureDescriptors.identifierBasedSPMeasure,
                ],
            ];

            it.each(positiveScenarios)("should match when %s", (_, identifier, descriptor) => {
                const predicate = headerPredicateFactory.identifierMatch(identifier);
                expect(predicate(descriptor, context)).toBe(true);
            });

            it("should NOT match when identifier-based SP derived measure identifier matches header composite identifier but it is not the current workspace", () => {
                const predicate = headerPredicateFactory.identifierMatch(
                    `some_other_${workspace}:identifierBasedMeasureIdentifier`,
                );

                expect(predicate(measureDescriptors.identifierBasedSPMeasure, context)).toBe(false);
            });
        });

        describe("derived show in % measure headers", () => {
            it("should NOT match when uri-based PP derived ratio measure identifier matches header identifier since measure was defined using uri in afm and ratio measure headers does not contain identifier", () => {
                const predicate = headerPredicateFactory.identifierMatch("uriBasedRatioMeasureIdentifier");

                expect(predicate(measureDescriptors.uriBasedPPRatioMeasure, context)).toBe(false);
            });

            it("should match when identifier-based PP derived ratio measure identifier matches header identifier", () => {
                const predicate = headerPredicateFactory.identifierMatch(
                    "identifierBasedRatioMeasureIdentifier",
                );

                expect(predicate(measureDescriptors.identifierBasedPPRatioMeasure, context)).toBe(true);
            });

            it("should NOT match when uri-based SP derived ratio measure identifier matches header identifier since measure was defined using uri in afm and ratio measure headers does not contain identifier", () => {
                const predicate = headerPredicateFactory.identifierMatch("uriBasedRatioMeasureIdentifier");

                expect(predicate(measureDescriptors.uriBasedSPRatioMeasure, context)).toBe(false);
            });

            it("should match when identifier-based SP derived ratio measure identifier matches header identifier", () => {
                const predicate = headerPredicateFactory.identifierMatch(
                    "identifierBasedRatioMeasureIdentifier",
                );

                expect(predicate(measureDescriptors.identifierBasedSPRatioMeasure, context)).toBe(true);
            });
        });

        describe("AM headers", () => {
            it("should NOT match when AM uri-based operand identifier matches header identifier since AMs are not supported", () => {
                const predicate = headerPredicateFactory.identifierMatch("uriBasedMeasureIdentifier");

                expect(predicate(measureDescriptors.arithmeticMeasure, context)).toBe(false);
            });

            it("should NOT match when AM identifier-based operand identifier matches header identifier since AMs are not supported", () => {
                const predicate = headerPredicateFactory.identifierMatch("identifierBasedMeasureIdentifier");

                expect(predicate(measureDescriptors.arithmeticMeasure, context)).toBe(false);
            });
        });
    });

    describe("attribute headers", () => {
        const positiveScenarios: [string, string, IAttributeDescriptor][] = [
            ["measure item identifier matches", "attributeIdentifier", attributeDescriptor],
            [
                "identifier-based measure identifier matches header composite identifier",
                `${workspace}:attributeIdentifier`,
                attributeDescriptor,
            ],
            [
                "composite-identifier-based measure item identifier matches",
                "attributeIdentifier",
                compositeAttributeDescriptor,
            ],
            [
                "composite-identifier-based measure identifier matches header composite identifier",
                `${workspace}:attributeIdentifier`,
                compositeAttributeDescriptor,
            ],
        ];

        it.each(positiveScenarios)("should match when %s", (_, identifier, descriptor) => {
            const predicate = headerPredicateFactory.identifierMatch(identifier);
            expect(predicate(descriptor, context)).toBe(true);
        });

        it("should NOT match when measure item identifier does not match", () => {
            const predicate = headerPredicateFactory.identifierMatch("someOtherIdentifier");
            expect(predicate(attributeDescriptor, context)).toBe(false);
        });
        it("should NOT match when identifier-based measure identifier matches header composite identifier but it is not the current workspace", () => {
            const predicate = headerPredicateFactory.identifierMatch(
                `some_other_${workspace}:attributeIdentifier`,
            );

            expect(predicate(attributeDescriptor, context)).toBe(false);
        });
    });

    describe("attribute item headers", () => {
        it("should NOT match since attributeHeaderItem does not have identifier", () => {
            // @ts-expect-error Testing possible inputs not allowed by types but possible if used from JavaScript
            const predicate = headerPredicateFactory.identifierMatch(null);

            expect(predicate(attributeHeaderItem, context)).toBe(false);
        });
    });
});

describe("composedFromUri", () => {
    describe("simple measure headers (not supported)", () => {
        it("should NOT match when uri-based measure identifier matches header identifier", () => {
            const predicate = headerPredicateFactory.composedFromIdentifier("uriBasedMeasureIdentifier");

            expect(predicate(measureDescriptors.uriBasedMeasure, context)).toBe(false);
        });
        it("should NOT match when identifier-based measure identifier matches header identifier", () => {
            const predicate = headerPredicateFactory.composedFromIdentifier(
                "identifierBasedMeasureIdentifier",
            );

            expect(predicate(measureDescriptors.identifierBasedMeasure, context)).toBe(false);
        });
    });

    describe("ad-hoc measure headers (not supported)", () => {
        it("should NOT match when ad-hoc measure is created from identifier-based attribute matching uri", () => {
            const predicate = headerPredicateFactory.composedFromUri("/attributeUri");

            expect(predicate(measureDescriptors.identifierBasedAdhocMeasure, context)).toBe(false);
        });

        it("should NOT match when ad-hoc measure is created from uri-based attribute matching uri", () => {
            const predicate = headerPredicateFactory.composedFromUri("/attributeUri");

            expect(predicate(measureDescriptors.uriBasedAdhocMeasure, context)).toBe(false);
        });
    });

    describe("derived measure headers (not supported)", () => {
        it("should NOT match when uri-based PP derived measure uri matches header uri", () => {
            const predicate = headerPredicateFactory.composedFromUri("/uriBasedPPMeasure");

            expect(predicate(measureDescriptors.uriBasedPPMeasure, context)).toBe(false);
        });
        it("should NOT match when identifier-based PP derived measure uri matches header uri", () => {
            const predicate = headerPredicateFactory.composedFromUri("/identifierBasedPPMeasure");

            expect(predicate(measureDescriptors.identifierBasedPPMeasure, context)).toBe(false);
        });
    });

    describe("AM headers", () => {
        it("should match when AM uri-based operand uri matches header uri", () => {
            const predicate = headerPredicateFactory.composedFromUri("/uriBasedMeasureUri");

            expect(predicate(measureDescriptors.arithmeticMeasure, context)).toBe(true);
        });
        it("should match when AM identifier-based operand uri matches header uri", () => {
            const predicate = headerPredicateFactory.composedFromUri("identifierBasedMeasureUri");

            expect(predicate(measureDescriptors.arithmeticMeasure, context)).toBe(true);
        });
        it("should NOT match when AM uri-based operand uri does not match header uri", () => {
            const predicate = headerPredicateFactory.composedFromUri("/someUri");

            expect(predicate(measureDescriptors.arithmeticMeasure, context)).toBe(false);
        });
    });

    describe("2nd order AM headers", () => {
        it("should match when 2nd order AM uri-based operand uri matches header uri", () => {
            const predicate = headerPredicateFactory.composedFromUri("/uriBasedMeasureUri");

            expect(predicate(measureDescriptors.arithmeticMeasureOf2ndOrder, context)).toBe(true);
        });

        it("should match when 2nd order AM identifier-based operand uri matches header uri", () => {
            const predicate = headerPredicateFactory.composedFromUri("identifierBasedMeasureUri");

            expect(predicate(measureDescriptors.arithmeticMeasureOf2ndOrder, context)).toBe(true);
        });
        it("should NOT match when 2nd order AM uri-based operand uri does not match header uri", () => {
            const predicate = headerPredicateFactory.composedFromUri("/someOtherUri");

            expect(predicate(measureDescriptors.arithmeticMeasureOf2ndOrder, context)).toBe(false);
        });
    });

    describe("derived AM headers", () => {
        it("should match when AM uri-based PP+SP derived operand uri matches header uri", () => {
            const predicate = headerPredicateFactory.composedFromUri("/uriBasedMeasureUri");

            expect(predicate(measureDescriptors.uriBasedCompareArithmeticMeasure, context)).toBe(true);
        });
        it("should match when AM identifier-based PP+SP derived operand uri matches header uri", () => {
            const predicate = headerPredicateFactory.composedFromUri("identifierBasedMeasureUri");

            expect(predicate(measureDescriptors.identifierBasedCompareArithmeticMeasure, context)).toBe(true);
        });
    });

    describe("derived from AM", () => {
        it("should match when derived PP from AM matches header uri", () => {
            const predicate = headerPredicateFactory.composedFromUri("/uriBasedMeasureUri");

            expect(predicate(measureDescriptors.derivedPPFromArithmeticMeasure, context)).toEqual(true);
        });

        it("should not match when derived PP from AM doesn't match header uri", () => {
            const predicate = headerPredicateFactory.composedFromUri("/someOtherUri");

            expect(predicate(measureDescriptors.derivedPPFromArithmeticMeasure, context)).toEqual(false);
        });

        it("should match when derived SP from AM matches header uri", () => {
            const predicate = headerPredicateFactory.composedFromUri("/uriBasedMeasureUri");

            expect(predicate(measureDescriptors.derivedSPFromArithmeticMeasure, context)).toEqual(true);
        });

        it("should not match when derived SP from AM doesn't match header uri", () => {
            const predicate = headerPredicateFactory.composedFromUri("/someOtherUri");

            expect(predicate(measureDescriptors.derivedSPFromArithmeticMeasure, context)).toEqual(false);
        });
    });
});

describe("composedFromIdentifier", () => {
    describe("simple measure headers (not supported)", () => {
        it("should NOT match when uri-based measure identifier matches header identifier", () => {
            const predicate = headerPredicateFactory.composedFromIdentifier("uriBasedMeasureIdentifier");

            expect(predicate(measureDescriptors.uriBasedMeasure, context)).toBe(false);
        });
        it("should NOT match when identifier-based measure identifier matches header identifier", () => {
            const predicate = headerPredicateFactory.composedFromIdentifier(
                "identifierBasedMeasureIdentifier",
            );

            expect(predicate(measureDescriptors.identifierBasedMeasure, context)).toBe(false);
        });
    });

    describe("ad-hoc measure headers (not supported)", () => {
        it("should NOT match when ad-hoc measure is created from uri-based attribute matching identifier", () => {
            const predicate = headerPredicateFactory.composedFromIdentifier("uriBasedIdentifier");

            expect(predicate(measureDescriptors.uriBasedAdhocMeasure, context)).toBe(false);
        });

        it("should NOT match when ad-hoc measure is created from identifier-based attribute matching identifier", () => {
            const predicate = headerPredicateFactory.composedFromIdentifier("attributeIdentifier");

            expect(predicate(measureDescriptors.identifierBasedAdhocMeasure, context)).toBe(false);
        });
    });

    describe("derived measure headers (not supported)", () => {
        it("should NOT match when uri-based PP derived measure identifier matches header identifier", () => {
            const predicate = headerPredicateFactory.composedFromIdentifier("uriBasedPPMeasureIdentifier");

            expect(predicate(measureDescriptors.uriBasedPPMeasure, context)).toBe(false);
        });
        it("should NOT match when identifier-based PP derived measure identifier matches header identifier", () => {
            const predicate = headerPredicateFactory.composedFromIdentifier(
                "identifierBasedPPMeasureIdentifier",
            );

            expect(predicate(measureDescriptors.identifierBasedPPMeasure, context)).toBe(false);
        });
    });

    describe("AM headers", () => {
        const positiveScenarios: [string, string, IMeasureDescriptor][] = [
            [
                "uri-based operand identifier matches header identifier",
                "uriBasedMeasureIdentifier",
                measureDescriptors.arithmeticMeasure,
            ],
            [
                "identifier-based operand identifier matches header identifier",
                "identifierBasedMeasureIdentifier",
                measureDescriptors.arithmeticMeasure,
            ],
            [
                "identifier-based operand identifier matches header composite identifier",
                `${workspace}:identifierBasedMeasureIdentifier`,
                measureDescriptors.arithmeticMeasure,
            ],
        ];

        it.each(positiveScenarios)("should match when AM %s", (_, identifier, descriptor) => {
            const predicate = headerPredicateFactory.composedFromIdentifier(identifier);
            expect(predicate(descriptor, context)).toBe(true);
        });

        it("should NOT match when AM uri-based operand identifier does not match header identifier", () => {
            const predicate = headerPredicateFactory.composedFromIdentifier("someIdentifier");

            expect(predicate(measureDescriptors.arithmeticMeasure, context)).toBe(false);
        });
        it("should NOT match when AM identifier-based operand identifier matches header composite identifier but it is not the current workspace", () => {
            const predicate = headerPredicateFactory.composedFromIdentifier(
                `some_other_${workspace}:identifierBasedMeasureIdentifier`,
            );

            expect(predicate(measureDescriptors.arithmeticMeasure, context)).toBe(false);
        });
    });

    describe("2nd order AM headers", () => {
        const positiveScenarios: [string, string, IMeasureDescriptor][] = [
            [
                "uri-based operand identifier matches header identifier",
                "uriBasedMeasureIdentifier",
                measureDescriptors.arithmeticMeasureOf2ndOrder,
            ],
            [
                "identifier-based operand identifier matches header identifier",
                "identifierBasedMeasureIdentifier",
                measureDescriptors.arithmeticMeasureOf2ndOrder,
            ],
            [
                "identifier-based operand identifier matches header composite identifier",
                `${workspace}:identifierBasedMeasureIdentifier`,
                measureDescriptors.arithmeticMeasureOf2ndOrder,
            ],
        ];

        it.each(positiveScenarios)("should match when 2nd order AM %s", (_, identifier, descriptor) => {
            const predicate = headerPredicateFactory.composedFromIdentifier(identifier);
            expect(predicate(descriptor, context)).toBe(true);
        });

        it("should NOT match when 2nd order AM uri-based operand identifier does not match header identifier", () => {
            const predicate = headerPredicateFactory.composedFromIdentifier("someOtherId");

            expect(predicate(measureDescriptors.arithmeticMeasureOf2ndOrder, context)).toBe(false);
        });
        it("should NOT match when 2nd order AM identifier-based operand identifier matches header composite identifier but it is not the current workspace", () => {
            const predicate = headerPredicateFactory.composedFromIdentifier(
                `some_other_${workspace}:identifierBasedMeasureIdentifier`,
            );

            expect(predicate(measureDescriptors.arithmeticMeasureOf2ndOrder, context)).toBe(false);
        });
    });

    describe("derived AM headers", () => {
        const positiveScenarios: [string, string, IMeasureDescriptor][] = [
            [
                "uri-based PP+SP derived operand identifier matches header identifier",
                "uriBasedMeasureIdentifier",
                measureDescriptors.uriBasedCompareArithmeticMeasure,
            ],
            [
                "uri-based PP+SP derived operand identifier matches header composite identifier",
                `${workspace}:uriBasedMeasureIdentifier`,
                measureDescriptors.uriBasedCompareArithmeticMeasure,
            ],
            [
                "identifier-based PP+SP derived operand identifier matches header identifier",
                "identifierBasedMeasureIdentifier",
                measureDescriptors.identifierBasedCompareArithmeticMeasure,
            ],
            [
                "identifier-based PP+SP derived operand identifier matches header composite identifier",
                `${workspace}:identifierBasedMeasureIdentifier`,
                measureDescriptors.identifierBasedCompareArithmeticMeasure,
            ],
        ];

        it.each(positiveScenarios)("should match when AM %s", (_, identifier, descriptor) => {
            const predicate = headerPredicateFactory.composedFromIdentifier(identifier);
            expect(predicate(descriptor, context)).toBe(true);
        });
    });

    describe("derived from AM", () => {
        const positiveScenarios: [string, string, IMeasureDescriptor][] = [
            [
                "PP from AM matches header identifier",
                "identifierBasedMeasureIdentifier",
                measureDescriptors.derivedPPFromArithmeticMeasure,
            ],
            [
                "PP from AM matches header composite identifier",
                `${workspace}:identifierBasedMeasureIdentifier`,
                measureDescriptors.derivedPPFromArithmeticMeasure,
            ],
            [
                "SP from AM matches header identifier",
                "identifierBasedMeasureIdentifier",
                measureDescriptors.derivedSPFromArithmeticMeasure,
            ],
            [
                "SP from AM matches header composite identifier",
                `${workspace}:identifierBasedMeasureIdentifier`,
                measureDescriptors.derivedSPFromArithmeticMeasure,
            ],
        ];

        it.each(positiveScenarios)("should match when derived %s", (_, identifier, descriptor) => {
            const predicate = headerPredicateFactory.composedFromIdentifier(identifier);
            expect(predicate(descriptor, context)).toBe(true);
        });

        const negativeScenarios: [string, string, IMeasureDescriptor][] = [
            [
                "PP from AM doesn't match header identifier",
                "someOtherIdentifier",
                measureDescriptors.derivedPPFromArithmeticMeasure,
            ],
            [
                "PP from AM doesn't match header composite identifier",
                `${workspace}:someOtherIdentifier`,
                measureDescriptors.derivedPPFromArithmeticMeasure,
            ],
            [
                "SP from AM doesn't match header identifier",
                "someOtherIdentifier",
                measureDescriptors.derivedSPFromArithmeticMeasure,
            ],
            [
                "SP from AM doesn't match header composite identifier",
                `${workspace}:someOtherIdentifier`,
                measureDescriptors.derivedSPFromArithmeticMeasure,
            ],
        ];

        it.each(negativeScenarios)("should NOT match when derived %s", (_, identifier, descriptor) => {
            const predicate = headerPredicateFactory.composedFromIdentifier(identifier);
            expect(predicate(descriptor, context)).toBe(false);
        });
    });
});

describe("localIdentifierMatch", () => {
    it("should match predicate when measureHeaderItem localIdentifier matches", () => {
        const predicate = headerPredicateFactory.localIdentifierMatch("uriBasedMeasureLocalIdentifier");

        expect(predicate(measureDescriptors.uriBasedMeasure, context)).toBe(true);
    });

    it("should not match predicate when measureHeaderItem localIdentifier does not match", () => {
        const predicate = headerPredicateFactory.localIdentifierMatch("someOtherLocalIdentifier");

        expect(predicate(measureDescriptors.uriBasedMeasure, context)).toBe(false);
    });

    it("should return false when object is not measureHeaderItem", () => {
        const predicate = headerPredicateFactory.localIdentifierMatch("measureHeaderItem.localIdentifier");

        expect(predicate(attributeHeaderItem, context)).toBe(false);
    });
});

describe("attributeItemNameMatch", () => {
    it("should match predicate when attributeHeaderItem name matches", () => {
        const predicate = headerPredicateFactory.attributeItemNameMatch("attributeItemName");

        expect(predicate(attributeHeaderItem, context)).toBe(true);
    });

    it("should not match predicate when attributeHeaderItem name does not match", () => {
        const predicate = headerPredicateFactory.attributeItemNameMatch("someOtherName");

        expect(predicate(attributeHeaderItem, context)).toBe(false);
    });

    it("should not match predicate when empty name provided", () => {
        // @ts-expect-error Testing possible inputs not allowed by types but possible if used from JavaScript
        const predicate = headerPredicateFactory.attributeItemNameMatch(null);

        expect(predicate(attributeHeaderItem, context)).toBe(false);
    });

    it("should return false when object is not attributeHeaderItem", () => {
        const predicate = headerPredicateFactory.attributeItemNameMatch("attributeItemName");

        expect(predicate(measureDescriptors.uriBasedMeasure, context)).toBe(false);
    });
});

describe("objMatch tests", () => {
    it("should return false - empty input", () => {
        const predicate = headerPredicateFactory.objMatch(undefined);
        expect(predicate(attributeDescriptor, context)).toBe(false);
    });

    it("should match predicate when attribute matches", () => {
        const predicate = headerPredicateFactory.objMatch(
            newAttribute("attributeIdentifier", (a) =>
                a.localId(attributeDescriptor.attributeHeader.localIdentifier),
            ),
        );

        expect(predicate(attributeDescriptor, context)).toBe(true);
    });

    it("should not match predicate when attribute does not match", () => {
        const predicate = headerPredicateFactory.objMatch(newAttribute("otherAttributeIdentifier"));

        expect(predicate(attributeDescriptor, context)).toBe(false);
    });

    it("should match predicate when attribute objRef matches - identifier match scenario", () => {
        const attributeObjRef = attributeDisplayFormRef(newAttribute("attributeIdentifier"));

        const predicate = headerPredicateFactory.objMatch(attributeObjRef);

        expect(predicate(attributeDescriptor, context)).toBe(true);
    });

    it("should match predicate when attribute objRef matches - uri match scenario", () => {
        const attributeObjRef = attributeDisplayFormRef(newAttribute(uriRef("/attributeUri")));

        const predicate = headerPredicateFactory.objMatch(attributeObjRef);

        expect(predicate(attributeDescriptor, context)).toBe(true);
    });

    it("should match predicate when attribute objRef matches - identifier match negative scenario", () => {
        const attributeObjRef = attributeDisplayFormRef(newAttribute("otherAttributeIdentifier"));

        const predicate = headerPredicateFactory.objMatch(attributeObjRef);

        expect(predicate(attributeDescriptor, context)).toBe(false);
    });

    it("should match predicate when attribute objRef matches - uri match negative scenario", () => {
        const attributeObjRef = attributeDisplayFormRef(newAttribute(uriRef("/otherAttributeUri")));

        const predicate = headerPredicateFactory.objMatch(attributeObjRef);

        expect(predicate(attributeDescriptor, context)).toBe(false);
    });

    it("should match predicate when measure localIdentifier matches", () => {
        const measureObjRef = measureItem(
            newMeasure(uriRef(measureDescriptors.uriBasedMeasure.measureHeaderItem.uri!), (m) =>
                m.localId(measureDescriptors.identifierBasedRatioMeasure.measureHeaderItem.localIdentifier),
            ),
        );

        const predicate = headerPredicateFactory.objMatch(measureObjRef);

        expect(predicate(measureDescriptors.uriBasedMeasure, context)).toBe(true);
    });

    it("should match predicate when measure objRef matches", () => {
        const measureObjRef = measureItem(
            newMeasure(measureDescriptors.identifierBasedMeasure.measureHeaderItem.identifier!),
        );

        const predicate = headerPredicateFactory.objMatch(measureObjRef);

        expect(predicate(measureDescriptors.identifierBasedMeasure, context)).toBe(true);
    });

    it("should match predicate when localIdentifier does not match but measure objRef does", () => {
        const measureObjRef = measureItem(
            newMeasure(measureDescriptors.identifierBasedMeasure.measureHeaderItem.identifier!, (m) =>
                m.localId("someOtherLocalIdentifier"),
            ),
        );

        const predicate = headerPredicateFactory.objMatch(measureObjRef);

        expect(predicate(measureDescriptors.identifierBasedMeasure, context)).toBe(true);
    });

    it("should not match predicate when measure objRef does not match", () => {
        const measureObjRef = measureItem(newMeasure("otherIdentifier"));

        const predicate = headerPredicateFactory.objMatch(measureObjRef);

        expect(predicate(measureDescriptors.identifierBasedMeasure, context)).toBe(false);
    });
});

describe("objRefMatch tests", () => {
    it("objRefMatch - should match predicate when attribute objRef matches - identifier match scenario", () => {
        const attributeObjRef = attributeDisplayFormRef(newAttribute("attributeIdentifier"));

        const predicate = headerPredicateFactory.objRefMatch(attributeObjRef);

        expect(predicate(attributeDescriptor, context)).toBe(true);
    });

    it("objRefMatch - should match predicate when attribute objRef matches - composite identifier match scenario", () => {
        const attributeObjRef = attributeDisplayFormRef(newAttribute(`${workspace}:attributeIdentifier`));

        const predicate = headerPredicateFactory.objRefMatch(attributeObjRef);

        expect(predicate(attributeDescriptor, context)).toBe(true);
    });

    it("objRefMatch - should match predicate when attribute objRef matches - uri match scenario", () => {
        const attributeObjRef = attributeDisplayFormRef(newAttribute(uriRef("/attributeUri")));

        const predicate = headerPredicateFactory.objRefMatch(attributeObjRef);

        expect(predicate(attributeDescriptor, context)).toBe(true);
    });

    it("objRefMatch - should match predicate when attribute objRef matches - identifier match negative scenario", () => {
        const attributeObjRef = attributeDisplayFormRef(newAttribute("otherAttributeIdentifier"));

        const predicate = headerPredicateFactory.objRefMatch(attributeObjRef);

        expect(predicate(attributeDescriptor, context)).toBe(false);
    });

    it("objRefMatch - should match predicate when attribute objRef matches - composite identifier match negative scenario", () => {
        const attributeObjRef = attributeDisplayFormRef(
            newAttribute(`${workspace}:otherAttributeIdentifier`),
        );

        const predicate = headerPredicateFactory.objRefMatch(attributeObjRef);

        expect(predicate(attributeDescriptor, context)).toBe(false);
    });

    it("objRefMatch - should match predicate when attribute objRef matches - composite identifier match negative scenario (workspace mismatch)", () => {
        const attributeObjRef = attributeDisplayFormRef(
            newAttribute(`some_other_${workspace}:attributeIdentifier`),
        );

        const predicate = headerPredicateFactory.objRefMatch(attributeObjRef);

        expect(predicate(attributeDescriptor, context)).toBe(false);
    });

    it("objRefMatch - should match predicate when attribute objRef matches - uri match negative scenario", () => {
        const attributeObjRef = attributeDisplayFormRef(newAttribute(uriRef("/otherAttributeUri")));

        const predicate = headerPredicateFactory.objRefMatch(attributeObjRef);

        expect(predicate(attributeDescriptor, context)).toBe(false);
    });
});
