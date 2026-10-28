import type * as runtime from "@prisma/client/runtime/library";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model EquipmentLocationHistory
 *
 */
export type EquipmentLocationHistoryModel = runtime.Types.Result.DefaultSelection<Prisma.$EquipmentLocationHistoryPayload>;
export type AggregateEquipmentLocationHistory = {
    _count: EquipmentLocationHistoryCountAggregateOutputType | null;
    _avg: EquipmentLocationHistoryAvgAggregateOutputType | null;
    _sum: EquipmentLocationHistorySumAggregateOutputType | null;
    _min: EquipmentLocationHistoryMinAggregateOutputType | null;
    _max: EquipmentLocationHistoryMaxAggregateOutputType | null;
};
export type EquipmentLocationHistoryAvgAggregateOutputType = {
    id: number | null;
    equipmentId: number | null;
    fromLocationId: number | null;
    toLocationId: number | null;
};
export type EquipmentLocationHistorySumAggregateOutputType = {
    id: number | null;
    equipmentId: number | null;
    fromLocationId: number | null;
    toLocationId: number | null;
};
export type EquipmentLocationHistoryMinAggregateOutputType = {
    id: number | null;
    equipmentId: number | null;
    fromLocationId: number | null;
    toLocationId: number | null;
    changedAt: Date | null;
};
export type EquipmentLocationHistoryMaxAggregateOutputType = {
    id: number | null;
    equipmentId: number | null;
    fromLocationId: number | null;
    toLocationId: number | null;
    changedAt: Date | null;
};
export type EquipmentLocationHistoryCountAggregateOutputType = {
    id: number;
    equipmentId: number;
    fromLocationId: number;
    toLocationId: number;
    changedAt: number;
    _all: number;
};
export type EquipmentLocationHistoryAvgAggregateInputType = {
    id?: true;
    equipmentId?: true;
    fromLocationId?: true;
    toLocationId?: true;
};
export type EquipmentLocationHistorySumAggregateInputType = {
    id?: true;
    equipmentId?: true;
    fromLocationId?: true;
    toLocationId?: true;
};
export type EquipmentLocationHistoryMinAggregateInputType = {
    id?: true;
    equipmentId?: true;
    fromLocationId?: true;
    toLocationId?: true;
    changedAt?: true;
};
export type EquipmentLocationHistoryMaxAggregateInputType = {
    id?: true;
    equipmentId?: true;
    fromLocationId?: true;
    toLocationId?: true;
    changedAt?: true;
};
export type EquipmentLocationHistoryCountAggregateInputType = {
    id?: true;
    equipmentId?: true;
    fromLocationId?: true;
    toLocationId?: true;
    changedAt?: true;
    _all?: true;
};
export type EquipmentLocationHistoryAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which EquipmentLocationHistory to aggregate.
     */
    where?: Prisma.EquipmentLocationHistoryWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of EquipmentLocationHistories to fetch.
     */
    orderBy?: Prisma.EquipmentLocationHistoryOrderByWithRelationInput | Prisma.EquipmentLocationHistoryOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.EquipmentLocationHistoryWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` EquipmentLocationHistories from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` EquipmentLocationHistories.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned EquipmentLocationHistories
    **/
    _count?: true | EquipmentLocationHistoryCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: EquipmentLocationHistoryAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: EquipmentLocationHistorySumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: EquipmentLocationHistoryMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: EquipmentLocationHistoryMaxAggregateInputType;
};
export type GetEquipmentLocationHistoryAggregateType<T extends EquipmentLocationHistoryAggregateArgs> = {
    [P in keyof T & keyof AggregateEquipmentLocationHistory]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateEquipmentLocationHistory[P]> : Prisma.GetScalarType<T[P], AggregateEquipmentLocationHistory[P]>;
};
export type EquipmentLocationHistoryGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.EquipmentLocationHistoryWhereInput;
    orderBy?: Prisma.EquipmentLocationHistoryOrderByWithAggregationInput | Prisma.EquipmentLocationHistoryOrderByWithAggregationInput[];
    by: Prisma.EquipmentLocationHistoryScalarFieldEnum[] | Prisma.EquipmentLocationHistoryScalarFieldEnum;
    having?: Prisma.EquipmentLocationHistoryScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: EquipmentLocationHistoryCountAggregateInputType | true;
    _avg?: EquipmentLocationHistoryAvgAggregateInputType;
    _sum?: EquipmentLocationHistorySumAggregateInputType;
    _min?: EquipmentLocationHistoryMinAggregateInputType;
    _max?: EquipmentLocationHistoryMaxAggregateInputType;
};
export type EquipmentLocationHistoryGroupByOutputType = {
    id: number;
    equipmentId: number;
    fromLocationId: number | null;
    toLocationId: number;
    changedAt: Date;
    _count: EquipmentLocationHistoryCountAggregateOutputType | null;
    _avg: EquipmentLocationHistoryAvgAggregateOutputType | null;
    _sum: EquipmentLocationHistorySumAggregateOutputType | null;
    _min: EquipmentLocationHistoryMinAggregateOutputType | null;
    _max: EquipmentLocationHistoryMaxAggregateOutputType | null;
};
type GetEquipmentLocationHistoryGroupByPayload<T extends EquipmentLocationHistoryGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<EquipmentLocationHistoryGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof EquipmentLocationHistoryGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], EquipmentLocationHistoryGroupByOutputType[P]> : Prisma.GetScalarType<T[P], EquipmentLocationHistoryGroupByOutputType[P]>;
}>>;
export type EquipmentLocationHistoryWhereInput = {
    AND?: Prisma.EquipmentLocationHistoryWhereInput | Prisma.EquipmentLocationHistoryWhereInput[];
    OR?: Prisma.EquipmentLocationHistoryWhereInput[];
    NOT?: Prisma.EquipmentLocationHistoryWhereInput | Prisma.EquipmentLocationHistoryWhereInput[];
    id?: Prisma.IntFilter<"EquipmentLocationHistory"> | number;
    equipmentId?: Prisma.IntFilter<"EquipmentLocationHistory"> | number;
    fromLocationId?: Prisma.IntNullableFilter<"EquipmentLocationHistory"> | number | null;
    toLocationId?: Prisma.IntFilter<"EquipmentLocationHistory"> | number;
    changedAt?: Prisma.DateTimeFilter<"EquipmentLocationHistory"> | Date | string;
    equipment?: Prisma.XOR<Prisma.EquipmentScalarRelationFilter, Prisma.EquipmentWhereInput>;
    fromLocation?: Prisma.XOR<Prisma.LocationNullableScalarRelationFilter, Prisma.LocationWhereInput> | null;
    toLocation?: Prisma.XOR<Prisma.LocationScalarRelationFilter, Prisma.LocationWhereInput>;
};
export type EquipmentLocationHistoryOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    equipmentId?: Prisma.SortOrder;
    fromLocationId?: Prisma.SortOrderInput | Prisma.SortOrder;
    toLocationId?: Prisma.SortOrder;
    changedAt?: Prisma.SortOrder;
    equipment?: Prisma.EquipmentOrderByWithRelationInput;
    fromLocation?: Prisma.LocationOrderByWithRelationInput;
    toLocation?: Prisma.LocationOrderByWithRelationInput;
};
export type EquipmentLocationHistoryWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    AND?: Prisma.EquipmentLocationHistoryWhereInput | Prisma.EquipmentLocationHistoryWhereInput[];
    OR?: Prisma.EquipmentLocationHistoryWhereInput[];
    NOT?: Prisma.EquipmentLocationHistoryWhereInput | Prisma.EquipmentLocationHistoryWhereInput[];
    equipmentId?: Prisma.IntFilter<"EquipmentLocationHistory"> | number;
    fromLocationId?: Prisma.IntNullableFilter<"EquipmentLocationHistory"> | number | null;
    toLocationId?: Prisma.IntFilter<"EquipmentLocationHistory"> | number;
    changedAt?: Prisma.DateTimeFilter<"EquipmentLocationHistory"> | Date | string;
    equipment?: Prisma.XOR<Prisma.EquipmentScalarRelationFilter, Prisma.EquipmentWhereInput>;
    fromLocation?: Prisma.XOR<Prisma.LocationNullableScalarRelationFilter, Prisma.LocationWhereInput> | null;
    toLocation?: Prisma.XOR<Prisma.LocationScalarRelationFilter, Prisma.LocationWhereInput>;
}, "id">;
export type EquipmentLocationHistoryOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    equipmentId?: Prisma.SortOrder;
    fromLocationId?: Prisma.SortOrderInput | Prisma.SortOrder;
    toLocationId?: Prisma.SortOrder;
    changedAt?: Prisma.SortOrder;
    _count?: Prisma.EquipmentLocationHistoryCountOrderByAggregateInput;
    _avg?: Prisma.EquipmentLocationHistoryAvgOrderByAggregateInput;
    _max?: Prisma.EquipmentLocationHistoryMaxOrderByAggregateInput;
    _min?: Prisma.EquipmentLocationHistoryMinOrderByAggregateInput;
    _sum?: Prisma.EquipmentLocationHistorySumOrderByAggregateInput;
};
export type EquipmentLocationHistoryScalarWhereWithAggregatesInput = {
    AND?: Prisma.EquipmentLocationHistoryScalarWhereWithAggregatesInput | Prisma.EquipmentLocationHistoryScalarWhereWithAggregatesInput[];
    OR?: Prisma.EquipmentLocationHistoryScalarWhereWithAggregatesInput[];
    NOT?: Prisma.EquipmentLocationHistoryScalarWhereWithAggregatesInput | Prisma.EquipmentLocationHistoryScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"EquipmentLocationHistory"> | number;
    equipmentId?: Prisma.IntWithAggregatesFilter<"EquipmentLocationHistory"> | number;
    fromLocationId?: Prisma.IntNullableWithAggregatesFilter<"EquipmentLocationHistory"> | number | null;
    toLocationId?: Prisma.IntWithAggregatesFilter<"EquipmentLocationHistory"> | number;
    changedAt?: Prisma.DateTimeWithAggregatesFilter<"EquipmentLocationHistory"> | Date | string;
};
export type EquipmentLocationHistoryCreateInput = {
    changedAt?: Date | string;
    equipment: Prisma.EquipmentCreateNestedOneWithoutLocationHistoryInput;
    fromLocation?: Prisma.LocationCreateNestedOneWithoutHistoryFromInput;
    toLocation: Prisma.LocationCreateNestedOneWithoutHistoryToInput;
};
export type EquipmentLocationHistoryUncheckedCreateInput = {
    id?: number;
    equipmentId: number;
    fromLocationId?: number | null;
    toLocationId: number;
    changedAt?: Date | string;
};
export type EquipmentLocationHistoryUpdateInput = {
    changedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    equipment?: Prisma.EquipmentUpdateOneRequiredWithoutLocationHistoryNestedInput;
    fromLocation?: Prisma.LocationUpdateOneWithoutHistoryFromNestedInput;
    toLocation?: Prisma.LocationUpdateOneRequiredWithoutHistoryToNestedInput;
};
export type EquipmentLocationHistoryUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    equipmentId?: Prisma.IntFieldUpdateOperationsInput | number;
    fromLocationId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    toLocationId?: Prisma.IntFieldUpdateOperationsInput | number;
    changedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type EquipmentLocationHistoryCreateManyInput = {
    id?: number;
    equipmentId: number;
    fromLocationId?: number | null;
    toLocationId: number;
    changedAt?: Date | string;
};
export type EquipmentLocationHistoryUpdateManyMutationInput = {
    changedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type EquipmentLocationHistoryUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    equipmentId?: Prisma.IntFieldUpdateOperationsInput | number;
    fromLocationId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    toLocationId?: Prisma.IntFieldUpdateOperationsInput | number;
    changedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type EquipmentLocationHistoryListRelationFilter = {
    every?: Prisma.EquipmentLocationHistoryWhereInput;
    some?: Prisma.EquipmentLocationHistoryWhereInput;
    none?: Prisma.EquipmentLocationHistoryWhereInput;
};
export type EquipmentLocationHistoryOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type EquipmentLocationHistoryCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    equipmentId?: Prisma.SortOrder;
    fromLocationId?: Prisma.SortOrder;
    toLocationId?: Prisma.SortOrder;
    changedAt?: Prisma.SortOrder;
};
export type EquipmentLocationHistoryAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    equipmentId?: Prisma.SortOrder;
    fromLocationId?: Prisma.SortOrder;
    toLocationId?: Prisma.SortOrder;
};
export type EquipmentLocationHistoryMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    equipmentId?: Prisma.SortOrder;
    fromLocationId?: Prisma.SortOrder;
    toLocationId?: Prisma.SortOrder;
    changedAt?: Prisma.SortOrder;
};
export type EquipmentLocationHistoryMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    equipmentId?: Prisma.SortOrder;
    fromLocationId?: Prisma.SortOrder;
    toLocationId?: Prisma.SortOrder;
    changedAt?: Prisma.SortOrder;
};
export type EquipmentLocationHistorySumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    equipmentId?: Prisma.SortOrder;
    fromLocationId?: Prisma.SortOrder;
    toLocationId?: Prisma.SortOrder;
};
export type EquipmentLocationHistoryCreateNestedManyWithoutFromLocationInput = {
    create?: Prisma.XOR<Prisma.EquipmentLocationHistoryCreateWithoutFromLocationInput, Prisma.EquipmentLocationHistoryUncheckedCreateWithoutFromLocationInput> | Prisma.EquipmentLocationHistoryCreateWithoutFromLocationInput[] | Prisma.EquipmentLocationHistoryUncheckedCreateWithoutFromLocationInput[];
    connectOrCreate?: Prisma.EquipmentLocationHistoryCreateOrConnectWithoutFromLocationInput | Prisma.EquipmentLocationHistoryCreateOrConnectWithoutFromLocationInput[];
    createMany?: Prisma.EquipmentLocationHistoryCreateManyFromLocationInputEnvelope;
    connect?: Prisma.EquipmentLocationHistoryWhereUniqueInput | Prisma.EquipmentLocationHistoryWhereUniqueInput[];
};
export type EquipmentLocationHistoryCreateNestedManyWithoutToLocationInput = {
    create?: Prisma.XOR<Prisma.EquipmentLocationHistoryCreateWithoutToLocationInput, Prisma.EquipmentLocationHistoryUncheckedCreateWithoutToLocationInput> | Prisma.EquipmentLocationHistoryCreateWithoutToLocationInput[] | Prisma.EquipmentLocationHistoryUncheckedCreateWithoutToLocationInput[];
    connectOrCreate?: Prisma.EquipmentLocationHistoryCreateOrConnectWithoutToLocationInput | Prisma.EquipmentLocationHistoryCreateOrConnectWithoutToLocationInput[];
    createMany?: Prisma.EquipmentLocationHistoryCreateManyToLocationInputEnvelope;
    connect?: Prisma.EquipmentLocationHistoryWhereUniqueInput | Prisma.EquipmentLocationHistoryWhereUniqueInput[];
};
export type EquipmentLocationHistoryUncheckedCreateNestedManyWithoutFromLocationInput = {
    create?: Prisma.XOR<Prisma.EquipmentLocationHistoryCreateWithoutFromLocationInput, Prisma.EquipmentLocationHistoryUncheckedCreateWithoutFromLocationInput> | Prisma.EquipmentLocationHistoryCreateWithoutFromLocationInput[] | Prisma.EquipmentLocationHistoryUncheckedCreateWithoutFromLocationInput[];
    connectOrCreate?: Prisma.EquipmentLocationHistoryCreateOrConnectWithoutFromLocationInput | Prisma.EquipmentLocationHistoryCreateOrConnectWithoutFromLocationInput[];
    createMany?: Prisma.EquipmentLocationHistoryCreateManyFromLocationInputEnvelope;
    connect?: Prisma.EquipmentLocationHistoryWhereUniqueInput | Prisma.EquipmentLocationHistoryWhereUniqueInput[];
};
export type EquipmentLocationHistoryUncheckedCreateNestedManyWithoutToLocationInput = {
    create?: Prisma.XOR<Prisma.EquipmentLocationHistoryCreateWithoutToLocationInput, Prisma.EquipmentLocationHistoryUncheckedCreateWithoutToLocationInput> | Prisma.EquipmentLocationHistoryCreateWithoutToLocationInput[] | Prisma.EquipmentLocationHistoryUncheckedCreateWithoutToLocationInput[];
    connectOrCreate?: Prisma.EquipmentLocationHistoryCreateOrConnectWithoutToLocationInput | Prisma.EquipmentLocationHistoryCreateOrConnectWithoutToLocationInput[];
    createMany?: Prisma.EquipmentLocationHistoryCreateManyToLocationInputEnvelope;
    connect?: Prisma.EquipmentLocationHistoryWhereUniqueInput | Prisma.EquipmentLocationHistoryWhereUniqueInput[];
};
export type EquipmentLocationHistoryUpdateManyWithoutFromLocationNestedInput = {
    create?: Prisma.XOR<Prisma.EquipmentLocationHistoryCreateWithoutFromLocationInput, Prisma.EquipmentLocationHistoryUncheckedCreateWithoutFromLocationInput> | Prisma.EquipmentLocationHistoryCreateWithoutFromLocationInput[] | Prisma.EquipmentLocationHistoryUncheckedCreateWithoutFromLocationInput[];
    connectOrCreate?: Prisma.EquipmentLocationHistoryCreateOrConnectWithoutFromLocationInput | Prisma.EquipmentLocationHistoryCreateOrConnectWithoutFromLocationInput[];
    upsert?: Prisma.EquipmentLocationHistoryUpsertWithWhereUniqueWithoutFromLocationInput | Prisma.EquipmentLocationHistoryUpsertWithWhereUniqueWithoutFromLocationInput[];
    createMany?: Prisma.EquipmentLocationHistoryCreateManyFromLocationInputEnvelope;
    set?: Prisma.EquipmentLocationHistoryWhereUniqueInput | Prisma.EquipmentLocationHistoryWhereUniqueInput[];
    disconnect?: Prisma.EquipmentLocationHistoryWhereUniqueInput | Prisma.EquipmentLocationHistoryWhereUniqueInput[];
    delete?: Prisma.EquipmentLocationHistoryWhereUniqueInput | Prisma.EquipmentLocationHistoryWhereUniqueInput[];
    connect?: Prisma.EquipmentLocationHistoryWhereUniqueInput | Prisma.EquipmentLocationHistoryWhereUniqueInput[];
    update?: Prisma.EquipmentLocationHistoryUpdateWithWhereUniqueWithoutFromLocationInput | Prisma.EquipmentLocationHistoryUpdateWithWhereUniqueWithoutFromLocationInput[];
    updateMany?: Prisma.EquipmentLocationHistoryUpdateManyWithWhereWithoutFromLocationInput | Prisma.EquipmentLocationHistoryUpdateManyWithWhereWithoutFromLocationInput[];
    deleteMany?: Prisma.EquipmentLocationHistoryScalarWhereInput | Prisma.EquipmentLocationHistoryScalarWhereInput[];
};
export type EquipmentLocationHistoryUpdateManyWithoutToLocationNestedInput = {
    create?: Prisma.XOR<Prisma.EquipmentLocationHistoryCreateWithoutToLocationInput, Prisma.EquipmentLocationHistoryUncheckedCreateWithoutToLocationInput> | Prisma.EquipmentLocationHistoryCreateWithoutToLocationInput[] | Prisma.EquipmentLocationHistoryUncheckedCreateWithoutToLocationInput[];
    connectOrCreate?: Prisma.EquipmentLocationHistoryCreateOrConnectWithoutToLocationInput | Prisma.EquipmentLocationHistoryCreateOrConnectWithoutToLocationInput[];
    upsert?: Prisma.EquipmentLocationHistoryUpsertWithWhereUniqueWithoutToLocationInput | Prisma.EquipmentLocationHistoryUpsertWithWhereUniqueWithoutToLocationInput[];
    createMany?: Prisma.EquipmentLocationHistoryCreateManyToLocationInputEnvelope;
    set?: Prisma.EquipmentLocationHistoryWhereUniqueInput | Prisma.EquipmentLocationHistoryWhereUniqueInput[];
    disconnect?: Prisma.EquipmentLocationHistoryWhereUniqueInput | Prisma.EquipmentLocationHistoryWhereUniqueInput[];
    delete?: Prisma.EquipmentLocationHistoryWhereUniqueInput | Prisma.EquipmentLocationHistoryWhereUniqueInput[];
    connect?: Prisma.EquipmentLocationHistoryWhereUniqueInput | Prisma.EquipmentLocationHistoryWhereUniqueInput[];
    update?: Prisma.EquipmentLocationHistoryUpdateWithWhereUniqueWithoutToLocationInput | Prisma.EquipmentLocationHistoryUpdateWithWhereUniqueWithoutToLocationInput[];
    updateMany?: Prisma.EquipmentLocationHistoryUpdateManyWithWhereWithoutToLocationInput | Prisma.EquipmentLocationHistoryUpdateManyWithWhereWithoutToLocationInput[];
    deleteMany?: Prisma.EquipmentLocationHistoryScalarWhereInput | Prisma.EquipmentLocationHistoryScalarWhereInput[];
};
export type EquipmentLocationHistoryUncheckedUpdateManyWithoutFromLocationNestedInput = {
    create?: Prisma.XOR<Prisma.EquipmentLocationHistoryCreateWithoutFromLocationInput, Prisma.EquipmentLocationHistoryUncheckedCreateWithoutFromLocationInput> | Prisma.EquipmentLocationHistoryCreateWithoutFromLocationInput[] | Prisma.EquipmentLocationHistoryUncheckedCreateWithoutFromLocationInput[];
    connectOrCreate?: Prisma.EquipmentLocationHistoryCreateOrConnectWithoutFromLocationInput | Prisma.EquipmentLocationHistoryCreateOrConnectWithoutFromLocationInput[];
    upsert?: Prisma.EquipmentLocationHistoryUpsertWithWhereUniqueWithoutFromLocationInput | Prisma.EquipmentLocationHistoryUpsertWithWhereUniqueWithoutFromLocationInput[];
    createMany?: Prisma.EquipmentLocationHistoryCreateManyFromLocationInputEnvelope;
    set?: Prisma.EquipmentLocationHistoryWhereUniqueInput | Prisma.EquipmentLocationHistoryWhereUniqueInput[];
    disconnect?: Prisma.EquipmentLocationHistoryWhereUniqueInput | Prisma.EquipmentLocationHistoryWhereUniqueInput[];
    delete?: Prisma.EquipmentLocationHistoryWhereUniqueInput | Prisma.EquipmentLocationHistoryWhereUniqueInput[];
    connect?: Prisma.EquipmentLocationHistoryWhereUniqueInput | Prisma.EquipmentLocationHistoryWhereUniqueInput[];
    update?: Prisma.EquipmentLocationHistoryUpdateWithWhereUniqueWithoutFromLocationInput | Prisma.EquipmentLocationHistoryUpdateWithWhereUniqueWithoutFromLocationInput[];
    updateMany?: Prisma.EquipmentLocationHistoryUpdateManyWithWhereWithoutFromLocationInput | Prisma.EquipmentLocationHistoryUpdateManyWithWhereWithoutFromLocationInput[];
    deleteMany?: Prisma.EquipmentLocationHistoryScalarWhereInput | Prisma.EquipmentLocationHistoryScalarWhereInput[];
};
export type EquipmentLocationHistoryUncheckedUpdateManyWithoutToLocationNestedInput = {
    create?: Prisma.XOR<Prisma.EquipmentLocationHistoryCreateWithoutToLocationInput, Prisma.EquipmentLocationHistoryUncheckedCreateWithoutToLocationInput> | Prisma.EquipmentLocationHistoryCreateWithoutToLocationInput[] | Prisma.EquipmentLocationHistoryUncheckedCreateWithoutToLocationInput[];
    connectOrCreate?: Prisma.EquipmentLocationHistoryCreateOrConnectWithoutToLocationInput | Prisma.EquipmentLocationHistoryCreateOrConnectWithoutToLocationInput[];
    upsert?: Prisma.EquipmentLocationHistoryUpsertWithWhereUniqueWithoutToLocationInput | Prisma.EquipmentLocationHistoryUpsertWithWhereUniqueWithoutToLocationInput[];
    createMany?: Prisma.EquipmentLocationHistoryCreateManyToLocationInputEnvelope;
    set?: Prisma.EquipmentLocationHistoryWhereUniqueInput | Prisma.EquipmentLocationHistoryWhereUniqueInput[];
    disconnect?: Prisma.EquipmentLocationHistoryWhereUniqueInput | Prisma.EquipmentLocationHistoryWhereUniqueInput[];
    delete?: Prisma.EquipmentLocationHistoryWhereUniqueInput | Prisma.EquipmentLocationHistoryWhereUniqueInput[];
    connect?: Prisma.EquipmentLocationHistoryWhereUniqueInput | Prisma.EquipmentLocationHistoryWhereUniqueInput[];
    update?: Prisma.EquipmentLocationHistoryUpdateWithWhereUniqueWithoutToLocationInput | Prisma.EquipmentLocationHistoryUpdateWithWhereUniqueWithoutToLocationInput[];
    updateMany?: Prisma.EquipmentLocationHistoryUpdateManyWithWhereWithoutToLocationInput | Prisma.EquipmentLocationHistoryUpdateManyWithWhereWithoutToLocationInput[];
    deleteMany?: Prisma.EquipmentLocationHistoryScalarWhereInput | Prisma.EquipmentLocationHistoryScalarWhereInput[];
};
export type EquipmentLocationHistoryCreateNestedManyWithoutEquipmentInput = {
    create?: Prisma.XOR<Prisma.EquipmentLocationHistoryCreateWithoutEquipmentInput, Prisma.EquipmentLocationHistoryUncheckedCreateWithoutEquipmentInput> | Prisma.EquipmentLocationHistoryCreateWithoutEquipmentInput[] | Prisma.EquipmentLocationHistoryUncheckedCreateWithoutEquipmentInput[];
    connectOrCreate?: Prisma.EquipmentLocationHistoryCreateOrConnectWithoutEquipmentInput | Prisma.EquipmentLocationHistoryCreateOrConnectWithoutEquipmentInput[];
    createMany?: Prisma.EquipmentLocationHistoryCreateManyEquipmentInputEnvelope;
    connect?: Prisma.EquipmentLocationHistoryWhereUniqueInput | Prisma.EquipmentLocationHistoryWhereUniqueInput[];
};
export type EquipmentLocationHistoryUncheckedCreateNestedManyWithoutEquipmentInput = {
    create?: Prisma.XOR<Prisma.EquipmentLocationHistoryCreateWithoutEquipmentInput, Prisma.EquipmentLocationHistoryUncheckedCreateWithoutEquipmentInput> | Prisma.EquipmentLocationHistoryCreateWithoutEquipmentInput[] | Prisma.EquipmentLocationHistoryUncheckedCreateWithoutEquipmentInput[];
    connectOrCreate?: Prisma.EquipmentLocationHistoryCreateOrConnectWithoutEquipmentInput | Prisma.EquipmentLocationHistoryCreateOrConnectWithoutEquipmentInput[];
    createMany?: Prisma.EquipmentLocationHistoryCreateManyEquipmentInputEnvelope;
    connect?: Prisma.EquipmentLocationHistoryWhereUniqueInput | Prisma.EquipmentLocationHistoryWhereUniqueInput[];
};
export type EquipmentLocationHistoryUpdateManyWithoutEquipmentNestedInput = {
    create?: Prisma.XOR<Prisma.EquipmentLocationHistoryCreateWithoutEquipmentInput, Prisma.EquipmentLocationHistoryUncheckedCreateWithoutEquipmentInput> | Prisma.EquipmentLocationHistoryCreateWithoutEquipmentInput[] | Prisma.EquipmentLocationHistoryUncheckedCreateWithoutEquipmentInput[];
    connectOrCreate?: Prisma.EquipmentLocationHistoryCreateOrConnectWithoutEquipmentInput | Prisma.EquipmentLocationHistoryCreateOrConnectWithoutEquipmentInput[];
    upsert?: Prisma.EquipmentLocationHistoryUpsertWithWhereUniqueWithoutEquipmentInput | Prisma.EquipmentLocationHistoryUpsertWithWhereUniqueWithoutEquipmentInput[];
    createMany?: Prisma.EquipmentLocationHistoryCreateManyEquipmentInputEnvelope;
    set?: Prisma.EquipmentLocationHistoryWhereUniqueInput | Prisma.EquipmentLocationHistoryWhereUniqueInput[];
    disconnect?: Prisma.EquipmentLocationHistoryWhereUniqueInput | Prisma.EquipmentLocationHistoryWhereUniqueInput[];
    delete?: Prisma.EquipmentLocationHistoryWhereUniqueInput | Prisma.EquipmentLocationHistoryWhereUniqueInput[];
    connect?: Prisma.EquipmentLocationHistoryWhereUniqueInput | Prisma.EquipmentLocationHistoryWhereUniqueInput[];
    update?: Prisma.EquipmentLocationHistoryUpdateWithWhereUniqueWithoutEquipmentInput | Prisma.EquipmentLocationHistoryUpdateWithWhereUniqueWithoutEquipmentInput[];
    updateMany?: Prisma.EquipmentLocationHistoryUpdateManyWithWhereWithoutEquipmentInput | Prisma.EquipmentLocationHistoryUpdateManyWithWhereWithoutEquipmentInput[];
    deleteMany?: Prisma.EquipmentLocationHistoryScalarWhereInput | Prisma.EquipmentLocationHistoryScalarWhereInput[];
};
export type EquipmentLocationHistoryUncheckedUpdateManyWithoutEquipmentNestedInput = {
    create?: Prisma.XOR<Prisma.EquipmentLocationHistoryCreateWithoutEquipmentInput, Prisma.EquipmentLocationHistoryUncheckedCreateWithoutEquipmentInput> | Prisma.EquipmentLocationHistoryCreateWithoutEquipmentInput[] | Prisma.EquipmentLocationHistoryUncheckedCreateWithoutEquipmentInput[];
    connectOrCreate?: Prisma.EquipmentLocationHistoryCreateOrConnectWithoutEquipmentInput | Prisma.EquipmentLocationHistoryCreateOrConnectWithoutEquipmentInput[];
    upsert?: Prisma.EquipmentLocationHistoryUpsertWithWhereUniqueWithoutEquipmentInput | Prisma.EquipmentLocationHistoryUpsertWithWhereUniqueWithoutEquipmentInput[];
    createMany?: Prisma.EquipmentLocationHistoryCreateManyEquipmentInputEnvelope;
    set?: Prisma.EquipmentLocationHistoryWhereUniqueInput | Prisma.EquipmentLocationHistoryWhereUniqueInput[];
    disconnect?: Prisma.EquipmentLocationHistoryWhereUniqueInput | Prisma.EquipmentLocationHistoryWhereUniqueInput[];
    delete?: Prisma.EquipmentLocationHistoryWhereUniqueInput | Prisma.EquipmentLocationHistoryWhereUniqueInput[];
    connect?: Prisma.EquipmentLocationHistoryWhereUniqueInput | Prisma.EquipmentLocationHistoryWhereUniqueInput[];
    update?: Prisma.EquipmentLocationHistoryUpdateWithWhereUniqueWithoutEquipmentInput | Prisma.EquipmentLocationHistoryUpdateWithWhereUniqueWithoutEquipmentInput[];
    updateMany?: Prisma.EquipmentLocationHistoryUpdateManyWithWhereWithoutEquipmentInput | Prisma.EquipmentLocationHistoryUpdateManyWithWhereWithoutEquipmentInput[];
    deleteMany?: Prisma.EquipmentLocationHistoryScalarWhereInput | Prisma.EquipmentLocationHistoryScalarWhereInput[];
};
export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type EquipmentLocationHistoryCreateWithoutFromLocationInput = {
    changedAt?: Date | string;
    equipment: Prisma.EquipmentCreateNestedOneWithoutLocationHistoryInput;
    toLocation: Prisma.LocationCreateNestedOneWithoutHistoryToInput;
};
export type EquipmentLocationHistoryUncheckedCreateWithoutFromLocationInput = {
    id?: number;
    equipmentId: number;
    toLocationId: number;
    changedAt?: Date | string;
};
export type EquipmentLocationHistoryCreateOrConnectWithoutFromLocationInput = {
    where: Prisma.EquipmentLocationHistoryWhereUniqueInput;
    create: Prisma.XOR<Prisma.EquipmentLocationHistoryCreateWithoutFromLocationInput, Prisma.EquipmentLocationHistoryUncheckedCreateWithoutFromLocationInput>;
};
export type EquipmentLocationHistoryCreateManyFromLocationInputEnvelope = {
    data: Prisma.EquipmentLocationHistoryCreateManyFromLocationInput | Prisma.EquipmentLocationHistoryCreateManyFromLocationInput[];
    skipDuplicates?: boolean;
};
export type EquipmentLocationHistoryCreateWithoutToLocationInput = {
    changedAt?: Date | string;
    equipment: Prisma.EquipmentCreateNestedOneWithoutLocationHistoryInput;
    fromLocation?: Prisma.LocationCreateNestedOneWithoutHistoryFromInput;
};
export type EquipmentLocationHistoryUncheckedCreateWithoutToLocationInput = {
    id?: number;
    equipmentId: number;
    fromLocationId?: number | null;
    changedAt?: Date | string;
};
export type EquipmentLocationHistoryCreateOrConnectWithoutToLocationInput = {
    where: Prisma.EquipmentLocationHistoryWhereUniqueInput;
    create: Prisma.XOR<Prisma.EquipmentLocationHistoryCreateWithoutToLocationInput, Prisma.EquipmentLocationHistoryUncheckedCreateWithoutToLocationInput>;
};
export type EquipmentLocationHistoryCreateManyToLocationInputEnvelope = {
    data: Prisma.EquipmentLocationHistoryCreateManyToLocationInput | Prisma.EquipmentLocationHistoryCreateManyToLocationInput[];
    skipDuplicates?: boolean;
};
export type EquipmentLocationHistoryUpsertWithWhereUniqueWithoutFromLocationInput = {
    where: Prisma.EquipmentLocationHistoryWhereUniqueInput;
    update: Prisma.XOR<Prisma.EquipmentLocationHistoryUpdateWithoutFromLocationInput, Prisma.EquipmentLocationHistoryUncheckedUpdateWithoutFromLocationInput>;
    create: Prisma.XOR<Prisma.EquipmentLocationHistoryCreateWithoutFromLocationInput, Prisma.EquipmentLocationHistoryUncheckedCreateWithoutFromLocationInput>;
};
export type EquipmentLocationHistoryUpdateWithWhereUniqueWithoutFromLocationInput = {
    where: Prisma.EquipmentLocationHistoryWhereUniqueInput;
    data: Prisma.XOR<Prisma.EquipmentLocationHistoryUpdateWithoutFromLocationInput, Prisma.EquipmentLocationHistoryUncheckedUpdateWithoutFromLocationInput>;
};
export type EquipmentLocationHistoryUpdateManyWithWhereWithoutFromLocationInput = {
    where: Prisma.EquipmentLocationHistoryScalarWhereInput;
    data: Prisma.XOR<Prisma.EquipmentLocationHistoryUpdateManyMutationInput, Prisma.EquipmentLocationHistoryUncheckedUpdateManyWithoutFromLocationInput>;
};
export type EquipmentLocationHistoryScalarWhereInput = {
    AND?: Prisma.EquipmentLocationHistoryScalarWhereInput | Prisma.EquipmentLocationHistoryScalarWhereInput[];
    OR?: Prisma.EquipmentLocationHistoryScalarWhereInput[];
    NOT?: Prisma.EquipmentLocationHistoryScalarWhereInput | Prisma.EquipmentLocationHistoryScalarWhereInput[];
    id?: Prisma.IntFilter<"EquipmentLocationHistory"> | number;
    equipmentId?: Prisma.IntFilter<"EquipmentLocationHistory"> | number;
    fromLocationId?: Prisma.IntNullableFilter<"EquipmentLocationHistory"> | number | null;
    toLocationId?: Prisma.IntFilter<"EquipmentLocationHistory"> | number;
    changedAt?: Prisma.DateTimeFilter<"EquipmentLocationHistory"> | Date | string;
};
export type EquipmentLocationHistoryUpsertWithWhereUniqueWithoutToLocationInput = {
    where: Prisma.EquipmentLocationHistoryWhereUniqueInput;
    update: Prisma.XOR<Prisma.EquipmentLocationHistoryUpdateWithoutToLocationInput, Prisma.EquipmentLocationHistoryUncheckedUpdateWithoutToLocationInput>;
    create: Prisma.XOR<Prisma.EquipmentLocationHistoryCreateWithoutToLocationInput, Prisma.EquipmentLocationHistoryUncheckedCreateWithoutToLocationInput>;
};
export type EquipmentLocationHistoryUpdateWithWhereUniqueWithoutToLocationInput = {
    where: Prisma.EquipmentLocationHistoryWhereUniqueInput;
    data: Prisma.XOR<Prisma.EquipmentLocationHistoryUpdateWithoutToLocationInput, Prisma.EquipmentLocationHistoryUncheckedUpdateWithoutToLocationInput>;
};
export type EquipmentLocationHistoryUpdateManyWithWhereWithoutToLocationInput = {
    where: Prisma.EquipmentLocationHistoryScalarWhereInput;
    data: Prisma.XOR<Prisma.EquipmentLocationHistoryUpdateManyMutationInput, Prisma.EquipmentLocationHistoryUncheckedUpdateManyWithoutToLocationInput>;
};
export type EquipmentLocationHistoryCreateWithoutEquipmentInput = {
    changedAt?: Date | string;
    fromLocation?: Prisma.LocationCreateNestedOneWithoutHistoryFromInput;
    toLocation: Prisma.LocationCreateNestedOneWithoutHistoryToInput;
};
export type EquipmentLocationHistoryUncheckedCreateWithoutEquipmentInput = {
    id?: number;
    fromLocationId?: number | null;
    toLocationId: number;
    changedAt?: Date | string;
};
export type EquipmentLocationHistoryCreateOrConnectWithoutEquipmentInput = {
    where: Prisma.EquipmentLocationHistoryWhereUniqueInput;
    create: Prisma.XOR<Prisma.EquipmentLocationHistoryCreateWithoutEquipmentInput, Prisma.EquipmentLocationHistoryUncheckedCreateWithoutEquipmentInput>;
};
export type EquipmentLocationHistoryCreateManyEquipmentInputEnvelope = {
    data: Prisma.EquipmentLocationHistoryCreateManyEquipmentInput | Prisma.EquipmentLocationHistoryCreateManyEquipmentInput[];
    skipDuplicates?: boolean;
};
export type EquipmentLocationHistoryUpsertWithWhereUniqueWithoutEquipmentInput = {
    where: Prisma.EquipmentLocationHistoryWhereUniqueInput;
    update: Prisma.XOR<Prisma.EquipmentLocationHistoryUpdateWithoutEquipmentInput, Prisma.EquipmentLocationHistoryUncheckedUpdateWithoutEquipmentInput>;
    create: Prisma.XOR<Prisma.EquipmentLocationHistoryCreateWithoutEquipmentInput, Prisma.EquipmentLocationHistoryUncheckedCreateWithoutEquipmentInput>;
};
export type EquipmentLocationHistoryUpdateWithWhereUniqueWithoutEquipmentInput = {
    where: Prisma.EquipmentLocationHistoryWhereUniqueInput;
    data: Prisma.XOR<Prisma.EquipmentLocationHistoryUpdateWithoutEquipmentInput, Prisma.EquipmentLocationHistoryUncheckedUpdateWithoutEquipmentInput>;
};
export type EquipmentLocationHistoryUpdateManyWithWhereWithoutEquipmentInput = {
    where: Prisma.EquipmentLocationHistoryScalarWhereInput;
    data: Prisma.XOR<Prisma.EquipmentLocationHistoryUpdateManyMutationInput, Prisma.EquipmentLocationHistoryUncheckedUpdateManyWithoutEquipmentInput>;
};
export type EquipmentLocationHistoryCreateManyFromLocationInput = {
    id?: number;
    equipmentId: number;
    toLocationId: number;
    changedAt?: Date | string;
};
export type EquipmentLocationHistoryCreateManyToLocationInput = {
    id?: number;
    equipmentId: number;
    fromLocationId?: number | null;
    changedAt?: Date | string;
};
export type EquipmentLocationHistoryUpdateWithoutFromLocationInput = {
    changedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    equipment?: Prisma.EquipmentUpdateOneRequiredWithoutLocationHistoryNestedInput;
    toLocation?: Prisma.LocationUpdateOneRequiredWithoutHistoryToNestedInput;
};
export type EquipmentLocationHistoryUncheckedUpdateWithoutFromLocationInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    equipmentId?: Prisma.IntFieldUpdateOperationsInput | number;
    toLocationId?: Prisma.IntFieldUpdateOperationsInput | number;
    changedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type EquipmentLocationHistoryUncheckedUpdateManyWithoutFromLocationInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    equipmentId?: Prisma.IntFieldUpdateOperationsInput | number;
    toLocationId?: Prisma.IntFieldUpdateOperationsInput | number;
    changedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type EquipmentLocationHistoryUpdateWithoutToLocationInput = {
    changedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    equipment?: Prisma.EquipmentUpdateOneRequiredWithoutLocationHistoryNestedInput;
    fromLocation?: Prisma.LocationUpdateOneWithoutHistoryFromNestedInput;
};
export type EquipmentLocationHistoryUncheckedUpdateWithoutToLocationInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    equipmentId?: Prisma.IntFieldUpdateOperationsInput | number;
    fromLocationId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    changedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type EquipmentLocationHistoryUncheckedUpdateManyWithoutToLocationInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    equipmentId?: Prisma.IntFieldUpdateOperationsInput | number;
    fromLocationId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    changedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type EquipmentLocationHistoryCreateManyEquipmentInput = {
    id?: number;
    fromLocationId?: number | null;
    toLocationId: number;
    changedAt?: Date | string;
};
export type EquipmentLocationHistoryUpdateWithoutEquipmentInput = {
    changedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    fromLocation?: Prisma.LocationUpdateOneWithoutHistoryFromNestedInput;
    toLocation?: Prisma.LocationUpdateOneRequiredWithoutHistoryToNestedInput;
};
export type EquipmentLocationHistoryUncheckedUpdateWithoutEquipmentInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    fromLocationId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    toLocationId?: Prisma.IntFieldUpdateOperationsInput | number;
    changedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type EquipmentLocationHistoryUncheckedUpdateManyWithoutEquipmentInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    fromLocationId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    toLocationId?: Prisma.IntFieldUpdateOperationsInput | number;
    changedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type EquipmentLocationHistorySelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    equipmentId?: boolean;
    fromLocationId?: boolean;
    toLocationId?: boolean;
    changedAt?: boolean;
    equipment?: boolean | Prisma.EquipmentDefaultArgs<ExtArgs>;
    fromLocation?: boolean | Prisma.EquipmentLocationHistory$fromLocationArgs<ExtArgs>;
    toLocation?: boolean | Prisma.LocationDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["equipmentLocationHistory"]>;
export type EquipmentLocationHistorySelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    equipmentId?: boolean;
    fromLocationId?: boolean;
    toLocationId?: boolean;
    changedAt?: boolean;
    equipment?: boolean | Prisma.EquipmentDefaultArgs<ExtArgs>;
    fromLocation?: boolean | Prisma.EquipmentLocationHistory$fromLocationArgs<ExtArgs>;
    toLocation?: boolean | Prisma.LocationDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["equipmentLocationHistory"]>;
export type EquipmentLocationHistorySelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    equipmentId?: boolean;
    fromLocationId?: boolean;
    toLocationId?: boolean;
    changedAt?: boolean;
    equipment?: boolean | Prisma.EquipmentDefaultArgs<ExtArgs>;
    fromLocation?: boolean | Prisma.EquipmentLocationHistory$fromLocationArgs<ExtArgs>;
    toLocation?: boolean | Prisma.LocationDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["equipmentLocationHistory"]>;
export type EquipmentLocationHistorySelectScalar = {
    id?: boolean;
    equipmentId?: boolean;
    fromLocationId?: boolean;
    toLocationId?: boolean;
    changedAt?: boolean;
};
export type EquipmentLocationHistoryOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "equipmentId" | "fromLocationId" | "toLocationId" | "changedAt", ExtArgs["result"]["equipmentLocationHistory"]>;
export type EquipmentLocationHistoryInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    equipment?: boolean | Prisma.EquipmentDefaultArgs<ExtArgs>;
    fromLocation?: boolean | Prisma.EquipmentLocationHistory$fromLocationArgs<ExtArgs>;
    toLocation?: boolean | Prisma.LocationDefaultArgs<ExtArgs>;
};
export type EquipmentLocationHistoryIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    equipment?: boolean | Prisma.EquipmentDefaultArgs<ExtArgs>;
    fromLocation?: boolean | Prisma.EquipmentLocationHistory$fromLocationArgs<ExtArgs>;
    toLocation?: boolean | Prisma.LocationDefaultArgs<ExtArgs>;
};
export type EquipmentLocationHistoryIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    equipment?: boolean | Prisma.EquipmentDefaultArgs<ExtArgs>;
    fromLocation?: boolean | Prisma.EquipmentLocationHistory$fromLocationArgs<ExtArgs>;
    toLocation?: boolean | Prisma.LocationDefaultArgs<ExtArgs>;
};
export type $EquipmentLocationHistoryPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "EquipmentLocationHistory";
    objects: {
        equipment: Prisma.$EquipmentPayload<ExtArgs>;
        fromLocation: Prisma.$LocationPayload<ExtArgs> | null;
        toLocation: Prisma.$LocationPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        equipmentId: number;
        fromLocationId: number | null;
        toLocationId: number;
        changedAt: Date;
    }, ExtArgs["result"]["equipmentLocationHistory"]>;
    composites: {};
};
export type EquipmentLocationHistoryGetPayload<S extends boolean | null | undefined | EquipmentLocationHistoryDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$EquipmentLocationHistoryPayload, S>;
export type EquipmentLocationHistoryCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<EquipmentLocationHistoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: EquipmentLocationHistoryCountAggregateInputType | true;
};
export interface EquipmentLocationHistoryDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['EquipmentLocationHistory'];
        meta: {
            name: 'EquipmentLocationHistory';
        };
    };
    /**
     * Find zero or one EquipmentLocationHistory that matches the filter.
     * @param {EquipmentLocationHistoryFindUniqueArgs} args - Arguments to find a EquipmentLocationHistory
     * @example
     * // Get one EquipmentLocationHistory
     * const equipmentLocationHistory = await prisma.equipmentLocationHistory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EquipmentLocationHistoryFindUniqueArgs>(args: Prisma.SelectSubset<T, EquipmentLocationHistoryFindUniqueArgs<ExtArgs>>): Prisma.Prisma__EquipmentLocationHistoryClient<runtime.Types.Result.GetResult<Prisma.$EquipmentLocationHistoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one EquipmentLocationHistory that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EquipmentLocationHistoryFindUniqueOrThrowArgs} args - Arguments to find a EquipmentLocationHistory
     * @example
     * // Get one EquipmentLocationHistory
     * const equipmentLocationHistory = await prisma.equipmentLocationHistory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EquipmentLocationHistoryFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, EquipmentLocationHistoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__EquipmentLocationHistoryClient<runtime.Types.Result.GetResult<Prisma.$EquipmentLocationHistoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first EquipmentLocationHistory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EquipmentLocationHistoryFindFirstArgs} args - Arguments to find a EquipmentLocationHistory
     * @example
     * // Get one EquipmentLocationHistory
     * const equipmentLocationHistory = await prisma.equipmentLocationHistory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EquipmentLocationHistoryFindFirstArgs>(args?: Prisma.SelectSubset<T, EquipmentLocationHistoryFindFirstArgs<ExtArgs>>): Prisma.Prisma__EquipmentLocationHistoryClient<runtime.Types.Result.GetResult<Prisma.$EquipmentLocationHistoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first EquipmentLocationHistory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EquipmentLocationHistoryFindFirstOrThrowArgs} args - Arguments to find a EquipmentLocationHistory
     * @example
     * // Get one EquipmentLocationHistory
     * const equipmentLocationHistory = await prisma.equipmentLocationHistory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EquipmentLocationHistoryFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, EquipmentLocationHistoryFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__EquipmentLocationHistoryClient<runtime.Types.Result.GetResult<Prisma.$EquipmentLocationHistoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more EquipmentLocationHistories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EquipmentLocationHistoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EquipmentLocationHistories
     * const equipmentLocationHistories = await prisma.equipmentLocationHistory.findMany()
     *
     * // Get first 10 EquipmentLocationHistories
     * const equipmentLocationHistories = await prisma.equipmentLocationHistory.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const equipmentLocationHistoryWithIdOnly = await prisma.equipmentLocationHistory.findMany({ select: { id: true } })
     *
     */
    findMany<T extends EquipmentLocationHistoryFindManyArgs>(args?: Prisma.SelectSubset<T, EquipmentLocationHistoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$EquipmentLocationHistoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a EquipmentLocationHistory.
     * @param {EquipmentLocationHistoryCreateArgs} args - Arguments to create a EquipmentLocationHistory.
     * @example
     * // Create one EquipmentLocationHistory
     * const EquipmentLocationHistory = await prisma.equipmentLocationHistory.create({
     *   data: {
     *     // ... data to create a EquipmentLocationHistory
     *   }
     * })
     *
     */
    create<T extends EquipmentLocationHistoryCreateArgs>(args: Prisma.SelectSubset<T, EquipmentLocationHistoryCreateArgs<ExtArgs>>): Prisma.Prisma__EquipmentLocationHistoryClient<runtime.Types.Result.GetResult<Prisma.$EquipmentLocationHistoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many EquipmentLocationHistories.
     * @param {EquipmentLocationHistoryCreateManyArgs} args - Arguments to create many EquipmentLocationHistories.
     * @example
     * // Create many EquipmentLocationHistories
     * const equipmentLocationHistory = await prisma.equipmentLocationHistory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends EquipmentLocationHistoryCreateManyArgs>(args?: Prisma.SelectSubset<T, EquipmentLocationHistoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many EquipmentLocationHistories and returns the data saved in the database.
     * @param {EquipmentLocationHistoryCreateManyAndReturnArgs} args - Arguments to create many EquipmentLocationHistories.
     * @example
     * // Create many EquipmentLocationHistories
     * const equipmentLocationHistory = await prisma.equipmentLocationHistory.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many EquipmentLocationHistories and only return the `id`
     * const equipmentLocationHistoryWithIdOnly = await prisma.equipmentLocationHistory.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends EquipmentLocationHistoryCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, EquipmentLocationHistoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$EquipmentLocationHistoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a EquipmentLocationHistory.
     * @param {EquipmentLocationHistoryDeleteArgs} args - Arguments to delete one EquipmentLocationHistory.
     * @example
     * // Delete one EquipmentLocationHistory
     * const EquipmentLocationHistory = await prisma.equipmentLocationHistory.delete({
     *   where: {
     *     // ... filter to delete one EquipmentLocationHistory
     *   }
     * })
     *
     */
    delete<T extends EquipmentLocationHistoryDeleteArgs>(args: Prisma.SelectSubset<T, EquipmentLocationHistoryDeleteArgs<ExtArgs>>): Prisma.Prisma__EquipmentLocationHistoryClient<runtime.Types.Result.GetResult<Prisma.$EquipmentLocationHistoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one EquipmentLocationHistory.
     * @param {EquipmentLocationHistoryUpdateArgs} args - Arguments to update one EquipmentLocationHistory.
     * @example
     * // Update one EquipmentLocationHistory
     * const equipmentLocationHistory = await prisma.equipmentLocationHistory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends EquipmentLocationHistoryUpdateArgs>(args: Prisma.SelectSubset<T, EquipmentLocationHistoryUpdateArgs<ExtArgs>>): Prisma.Prisma__EquipmentLocationHistoryClient<runtime.Types.Result.GetResult<Prisma.$EquipmentLocationHistoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more EquipmentLocationHistories.
     * @param {EquipmentLocationHistoryDeleteManyArgs} args - Arguments to filter EquipmentLocationHistories to delete.
     * @example
     * // Delete a few EquipmentLocationHistories
     * const { count } = await prisma.equipmentLocationHistory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends EquipmentLocationHistoryDeleteManyArgs>(args?: Prisma.SelectSubset<T, EquipmentLocationHistoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more EquipmentLocationHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EquipmentLocationHistoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EquipmentLocationHistories
     * const equipmentLocationHistory = await prisma.equipmentLocationHistory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends EquipmentLocationHistoryUpdateManyArgs>(args: Prisma.SelectSubset<T, EquipmentLocationHistoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more EquipmentLocationHistories and returns the data updated in the database.
     * @param {EquipmentLocationHistoryUpdateManyAndReturnArgs} args - Arguments to update many EquipmentLocationHistories.
     * @example
     * // Update many EquipmentLocationHistories
     * const equipmentLocationHistory = await prisma.equipmentLocationHistory.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more EquipmentLocationHistories and only return the `id`
     * const equipmentLocationHistoryWithIdOnly = await prisma.equipmentLocationHistory.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends EquipmentLocationHistoryUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, EquipmentLocationHistoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$EquipmentLocationHistoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one EquipmentLocationHistory.
     * @param {EquipmentLocationHistoryUpsertArgs} args - Arguments to update or create a EquipmentLocationHistory.
     * @example
     * // Update or create a EquipmentLocationHistory
     * const equipmentLocationHistory = await prisma.equipmentLocationHistory.upsert({
     *   create: {
     *     // ... data to create a EquipmentLocationHistory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EquipmentLocationHistory we want to update
     *   }
     * })
     */
    upsert<T extends EquipmentLocationHistoryUpsertArgs>(args: Prisma.SelectSubset<T, EquipmentLocationHistoryUpsertArgs<ExtArgs>>): Prisma.Prisma__EquipmentLocationHistoryClient<runtime.Types.Result.GetResult<Prisma.$EquipmentLocationHistoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of EquipmentLocationHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EquipmentLocationHistoryCountArgs} args - Arguments to filter EquipmentLocationHistories to count.
     * @example
     * // Count the number of EquipmentLocationHistories
     * const count = await prisma.equipmentLocationHistory.count({
     *   where: {
     *     // ... the filter for the EquipmentLocationHistories we want to count
     *   }
     * })
    **/
    count<T extends EquipmentLocationHistoryCountArgs>(args?: Prisma.Subset<T, EquipmentLocationHistoryCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], EquipmentLocationHistoryCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a EquipmentLocationHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EquipmentLocationHistoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EquipmentLocationHistoryAggregateArgs>(args: Prisma.Subset<T, EquipmentLocationHistoryAggregateArgs>): Prisma.PrismaPromise<GetEquipmentLocationHistoryAggregateType<T>>;
    /**
     * Group by EquipmentLocationHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EquipmentLocationHistoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
    **/
    groupBy<T extends EquipmentLocationHistoryGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: EquipmentLocationHistoryGroupByArgs['orderBy'];
    } : {
        orderBy?: EquipmentLocationHistoryGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, EquipmentLocationHistoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEquipmentLocationHistoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the EquipmentLocationHistory model
     */
    readonly fields: EquipmentLocationHistoryFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for EquipmentLocationHistory.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__EquipmentLocationHistoryClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    equipment<T extends Prisma.EquipmentDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.EquipmentDefaultArgs<ExtArgs>>): Prisma.Prisma__EquipmentClient<runtime.Types.Result.GetResult<Prisma.$EquipmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    fromLocation<T extends Prisma.EquipmentLocationHistory$fromLocationArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.EquipmentLocationHistory$fromLocationArgs<ExtArgs>>): Prisma.Prisma__LocationClient<runtime.Types.Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    toLocation<T extends Prisma.LocationDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.LocationDefaultArgs<ExtArgs>>): Prisma.Prisma__LocationClient<runtime.Types.Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
/**
 * Fields of the EquipmentLocationHistory model
 */
export interface EquipmentLocationHistoryFieldRefs {
    readonly id: Prisma.FieldRef<"EquipmentLocationHistory", 'Int'>;
    readonly equipmentId: Prisma.FieldRef<"EquipmentLocationHistory", 'Int'>;
    readonly fromLocationId: Prisma.FieldRef<"EquipmentLocationHistory", 'Int'>;
    readonly toLocationId: Prisma.FieldRef<"EquipmentLocationHistory", 'Int'>;
    readonly changedAt: Prisma.FieldRef<"EquipmentLocationHistory", 'DateTime'>;
}
/**
 * EquipmentLocationHistory findUnique
 */
export type EquipmentLocationHistoryFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EquipmentLocationHistory
     */
    select?: Prisma.EquipmentLocationHistorySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the EquipmentLocationHistory
     */
    omit?: Prisma.EquipmentLocationHistoryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.EquipmentLocationHistoryInclude<ExtArgs> | null;
    /**
     * Filter, which EquipmentLocationHistory to fetch.
     */
    where: Prisma.EquipmentLocationHistoryWhereUniqueInput;
};
/**
 * EquipmentLocationHistory findUniqueOrThrow
 */
export type EquipmentLocationHistoryFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EquipmentLocationHistory
     */
    select?: Prisma.EquipmentLocationHistorySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the EquipmentLocationHistory
     */
    omit?: Prisma.EquipmentLocationHistoryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.EquipmentLocationHistoryInclude<ExtArgs> | null;
    /**
     * Filter, which EquipmentLocationHistory to fetch.
     */
    where: Prisma.EquipmentLocationHistoryWhereUniqueInput;
};
/**
 * EquipmentLocationHistory findFirst
 */
export type EquipmentLocationHistoryFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EquipmentLocationHistory
     */
    select?: Prisma.EquipmentLocationHistorySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the EquipmentLocationHistory
     */
    omit?: Prisma.EquipmentLocationHistoryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.EquipmentLocationHistoryInclude<ExtArgs> | null;
    /**
     * Filter, which EquipmentLocationHistory to fetch.
     */
    where?: Prisma.EquipmentLocationHistoryWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of EquipmentLocationHistories to fetch.
     */
    orderBy?: Prisma.EquipmentLocationHistoryOrderByWithRelationInput | Prisma.EquipmentLocationHistoryOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for EquipmentLocationHistories.
     */
    cursor?: Prisma.EquipmentLocationHistoryWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` EquipmentLocationHistories from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` EquipmentLocationHistories.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of EquipmentLocationHistories.
     */
    distinct?: Prisma.EquipmentLocationHistoryScalarFieldEnum | Prisma.EquipmentLocationHistoryScalarFieldEnum[];
};
/**
 * EquipmentLocationHistory findFirstOrThrow
 */
export type EquipmentLocationHistoryFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EquipmentLocationHistory
     */
    select?: Prisma.EquipmentLocationHistorySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the EquipmentLocationHistory
     */
    omit?: Prisma.EquipmentLocationHistoryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.EquipmentLocationHistoryInclude<ExtArgs> | null;
    /**
     * Filter, which EquipmentLocationHistory to fetch.
     */
    where?: Prisma.EquipmentLocationHistoryWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of EquipmentLocationHistories to fetch.
     */
    orderBy?: Prisma.EquipmentLocationHistoryOrderByWithRelationInput | Prisma.EquipmentLocationHistoryOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for EquipmentLocationHistories.
     */
    cursor?: Prisma.EquipmentLocationHistoryWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` EquipmentLocationHistories from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` EquipmentLocationHistories.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of EquipmentLocationHistories.
     */
    distinct?: Prisma.EquipmentLocationHistoryScalarFieldEnum | Prisma.EquipmentLocationHistoryScalarFieldEnum[];
};
/**
 * EquipmentLocationHistory findMany
 */
export type EquipmentLocationHistoryFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EquipmentLocationHistory
     */
    select?: Prisma.EquipmentLocationHistorySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the EquipmentLocationHistory
     */
    omit?: Prisma.EquipmentLocationHistoryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.EquipmentLocationHistoryInclude<ExtArgs> | null;
    /**
     * Filter, which EquipmentLocationHistories to fetch.
     */
    where?: Prisma.EquipmentLocationHistoryWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of EquipmentLocationHistories to fetch.
     */
    orderBy?: Prisma.EquipmentLocationHistoryOrderByWithRelationInput | Prisma.EquipmentLocationHistoryOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing EquipmentLocationHistories.
     */
    cursor?: Prisma.EquipmentLocationHistoryWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` EquipmentLocationHistories from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` EquipmentLocationHistories.
     */
    skip?: number;
    distinct?: Prisma.EquipmentLocationHistoryScalarFieldEnum | Prisma.EquipmentLocationHistoryScalarFieldEnum[];
};
/**
 * EquipmentLocationHistory create
 */
export type EquipmentLocationHistoryCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EquipmentLocationHistory
     */
    select?: Prisma.EquipmentLocationHistorySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the EquipmentLocationHistory
     */
    omit?: Prisma.EquipmentLocationHistoryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.EquipmentLocationHistoryInclude<ExtArgs> | null;
    /**
     * The data needed to create a EquipmentLocationHistory.
     */
    data: Prisma.XOR<Prisma.EquipmentLocationHistoryCreateInput, Prisma.EquipmentLocationHistoryUncheckedCreateInput>;
};
/**
 * EquipmentLocationHistory createMany
 */
export type EquipmentLocationHistoryCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many EquipmentLocationHistories.
     */
    data: Prisma.EquipmentLocationHistoryCreateManyInput | Prisma.EquipmentLocationHistoryCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * EquipmentLocationHistory createManyAndReturn
 */
export type EquipmentLocationHistoryCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EquipmentLocationHistory
     */
    select?: Prisma.EquipmentLocationHistorySelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the EquipmentLocationHistory
     */
    omit?: Prisma.EquipmentLocationHistoryOmit<ExtArgs> | null;
    /**
     * The data used to create many EquipmentLocationHistories.
     */
    data: Prisma.EquipmentLocationHistoryCreateManyInput | Prisma.EquipmentLocationHistoryCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.EquipmentLocationHistoryIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * EquipmentLocationHistory update
 */
export type EquipmentLocationHistoryUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EquipmentLocationHistory
     */
    select?: Prisma.EquipmentLocationHistorySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the EquipmentLocationHistory
     */
    omit?: Prisma.EquipmentLocationHistoryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.EquipmentLocationHistoryInclude<ExtArgs> | null;
    /**
     * The data needed to update a EquipmentLocationHistory.
     */
    data: Prisma.XOR<Prisma.EquipmentLocationHistoryUpdateInput, Prisma.EquipmentLocationHistoryUncheckedUpdateInput>;
    /**
     * Choose, which EquipmentLocationHistory to update.
     */
    where: Prisma.EquipmentLocationHistoryWhereUniqueInput;
};
/**
 * EquipmentLocationHistory updateMany
 */
export type EquipmentLocationHistoryUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update EquipmentLocationHistories.
     */
    data: Prisma.XOR<Prisma.EquipmentLocationHistoryUpdateManyMutationInput, Prisma.EquipmentLocationHistoryUncheckedUpdateManyInput>;
    /**
     * Filter which EquipmentLocationHistories to update
     */
    where?: Prisma.EquipmentLocationHistoryWhereInput;
    /**
     * Limit how many EquipmentLocationHistories to update.
     */
    limit?: number;
};
/**
 * EquipmentLocationHistory updateManyAndReturn
 */
export type EquipmentLocationHistoryUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EquipmentLocationHistory
     */
    select?: Prisma.EquipmentLocationHistorySelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the EquipmentLocationHistory
     */
    omit?: Prisma.EquipmentLocationHistoryOmit<ExtArgs> | null;
    /**
     * The data used to update EquipmentLocationHistories.
     */
    data: Prisma.XOR<Prisma.EquipmentLocationHistoryUpdateManyMutationInput, Prisma.EquipmentLocationHistoryUncheckedUpdateManyInput>;
    /**
     * Filter which EquipmentLocationHistories to update
     */
    where?: Prisma.EquipmentLocationHistoryWhereInput;
    /**
     * Limit how many EquipmentLocationHistories to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.EquipmentLocationHistoryIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * EquipmentLocationHistory upsert
 */
export type EquipmentLocationHistoryUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EquipmentLocationHistory
     */
    select?: Prisma.EquipmentLocationHistorySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the EquipmentLocationHistory
     */
    omit?: Prisma.EquipmentLocationHistoryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.EquipmentLocationHistoryInclude<ExtArgs> | null;
    /**
     * The filter to search for the EquipmentLocationHistory to update in case it exists.
     */
    where: Prisma.EquipmentLocationHistoryWhereUniqueInput;
    /**
     * In case the EquipmentLocationHistory found by the `where` argument doesn't exist, create a new EquipmentLocationHistory with this data.
     */
    create: Prisma.XOR<Prisma.EquipmentLocationHistoryCreateInput, Prisma.EquipmentLocationHistoryUncheckedCreateInput>;
    /**
     * In case the EquipmentLocationHistory was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.EquipmentLocationHistoryUpdateInput, Prisma.EquipmentLocationHistoryUncheckedUpdateInput>;
};
/**
 * EquipmentLocationHistory delete
 */
export type EquipmentLocationHistoryDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EquipmentLocationHistory
     */
    select?: Prisma.EquipmentLocationHistorySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the EquipmentLocationHistory
     */
    omit?: Prisma.EquipmentLocationHistoryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.EquipmentLocationHistoryInclude<ExtArgs> | null;
    /**
     * Filter which EquipmentLocationHistory to delete.
     */
    where: Prisma.EquipmentLocationHistoryWhereUniqueInput;
};
/**
 * EquipmentLocationHistory deleteMany
 */
export type EquipmentLocationHistoryDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which EquipmentLocationHistories to delete
     */
    where?: Prisma.EquipmentLocationHistoryWhereInput;
    /**
     * Limit how many EquipmentLocationHistories to delete.
     */
    limit?: number;
};
/**
 * EquipmentLocationHistory.fromLocation
 */
export type EquipmentLocationHistory$fromLocationArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: Prisma.LocationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Location
     */
    omit?: Prisma.LocationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.LocationInclude<ExtArgs> | null;
    where?: Prisma.LocationWhereInput;
};
/**
 * EquipmentLocationHistory without action
 */
export type EquipmentLocationHistoryDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EquipmentLocationHistory
     */
    select?: Prisma.EquipmentLocationHistorySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the EquipmentLocationHistory
     */
    omit?: Prisma.EquipmentLocationHistoryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.EquipmentLocationHistoryInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=EquipmentLocationHistory.d.ts.map