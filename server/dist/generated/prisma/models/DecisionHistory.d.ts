import type * as runtime from "@prisma/client/runtime/library";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model DecisionHistory
 *
 */
export type DecisionHistoryModel = runtime.Types.Result.DefaultSelection<Prisma.$DecisionHistoryPayload>;
export type AggregateDecisionHistory = {
    _count: DecisionHistoryCountAggregateOutputType | null;
    _avg: DecisionHistoryAvgAggregateOutputType | null;
    _sum: DecisionHistorySumAggregateOutputType | null;
    _min: DecisionHistoryMinAggregateOutputType | null;
    _max: DecisionHistoryMaxAggregateOutputType | null;
};
export type DecisionHistoryAvgAggregateOutputType = {
    id: number | null;
    requestId: number | null;
    actorId: number | null;
};
export type DecisionHistorySumAggregateOutputType = {
    id: number | null;
    requestId: number | null;
    actorId: number | null;
};
export type DecisionHistoryMinAggregateOutputType = {
    id: number | null;
    requestId: number | null;
    previousStatus: $Enums.MaintenanceRequestStatus | null;
    newStatus: $Enums.MaintenanceRequestStatus | null;
    actorId: number | null;
    comment: string | null;
    createdAt: Date | null;
};
export type DecisionHistoryMaxAggregateOutputType = {
    id: number | null;
    requestId: number | null;
    previousStatus: $Enums.MaintenanceRequestStatus | null;
    newStatus: $Enums.MaintenanceRequestStatus | null;
    actorId: number | null;
    comment: string | null;
    createdAt: Date | null;
};
export type DecisionHistoryCountAggregateOutputType = {
    id: number;
    requestId: number;
    previousStatus: number;
    newStatus: number;
    actorId: number;
    comment: number;
    createdAt: number;
    _all: number;
};
export type DecisionHistoryAvgAggregateInputType = {
    id?: true;
    requestId?: true;
    actorId?: true;
};
export type DecisionHistorySumAggregateInputType = {
    id?: true;
    requestId?: true;
    actorId?: true;
};
export type DecisionHistoryMinAggregateInputType = {
    id?: true;
    requestId?: true;
    previousStatus?: true;
    newStatus?: true;
    actorId?: true;
    comment?: true;
    createdAt?: true;
};
export type DecisionHistoryMaxAggregateInputType = {
    id?: true;
    requestId?: true;
    previousStatus?: true;
    newStatus?: true;
    actorId?: true;
    comment?: true;
    createdAt?: true;
};
export type DecisionHistoryCountAggregateInputType = {
    id?: true;
    requestId?: true;
    previousStatus?: true;
    newStatus?: true;
    actorId?: true;
    comment?: true;
    createdAt?: true;
    _all?: true;
};
export type DecisionHistoryAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which DecisionHistory to aggregate.
     */
    where?: Prisma.DecisionHistoryWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of DecisionHistories to fetch.
     */
    orderBy?: Prisma.DecisionHistoryOrderByWithRelationInput | Prisma.DecisionHistoryOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.DecisionHistoryWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` DecisionHistories from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` DecisionHistories.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned DecisionHistories
    **/
    _count?: true | DecisionHistoryCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: DecisionHistoryAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: DecisionHistorySumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: DecisionHistoryMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: DecisionHistoryMaxAggregateInputType;
};
export type GetDecisionHistoryAggregateType<T extends DecisionHistoryAggregateArgs> = {
    [P in keyof T & keyof AggregateDecisionHistory]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateDecisionHistory[P]> : Prisma.GetScalarType<T[P], AggregateDecisionHistory[P]>;
};
export type DecisionHistoryGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DecisionHistoryWhereInput;
    orderBy?: Prisma.DecisionHistoryOrderByWithAggregationInput | Prisma.DecisionHistoryOrderByWithAggregationInput[];
    by: Prisma.DecisionHistoryScalarFieldEnum[] | Prisma.DecisionHistoryScalarFieldEnum;
    having?: Prisma.DecisionHistoryScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: DecisionHistoryCountAggregateInputType | true;
    _avg?: DecisionHistoryAvgAggregateInputType;
    _sum?: DecisionHistorySumAggregateInputType;
    _min?: DecisionHistoryMinAggregateInputType;
    _max?: DecisionHistoryMaxAggregateInputType;
};
export type DecisionHistoryGroupByOutputType = {
    id: number;
    requestId: number;
    previousStatus: $Enums.MaintenanceRequestStatus;
    newStatus: $Enums.MaintenanceRequestStatus;
    actorId: number;
    comment: string | null;
    createdAt: Date;
    _count: DecisionHistoryCountAggregateOutputType | null;
    _avg: DecisionHistoryAvgAggregateOutputType | null;
    _sum: DecisionHistorySumAggregateOutputType | null;
    _min: DecisionHistoryMinAggregateOutputType | null;
    _max: DecisionHistoryMaxAggregateOutputType | null;
};
type GetDecisionHistoryGroupByPayload<T extends DecisionHistoryGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<DecisionHistoryGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof DecisionHistoryGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], DecisionHistoryGroupByOutputType[P]> : Prisma.GetScalarType<T[P], DecisionHistoryGroupByOutputType[P]>;
}>>;
export type DecisionHistoryWhereInput = {
    AND?: Prisma.DecisionHistoryWhereInput | Prisma.DecisionHistoryWhereInput[];
    OR?: Prisma.DecisionHistoryWhereInput[];
    NOT?: Prisma.DecisionHistoryWhereInput | Prisma.DecisionHistoryWhereInput[];
    id?: Prisma.IntFilter<"DecisionHistory"> | number;
    requestId?: Prisma.IntFilter<"DecisionHistory"> | number;
    previousStatus?: Prisma.EnumMaintenanceRequestStatusFilter<"DecisionHistory"> | $Enums.MaintenanceRequestStatus;
    newStatus?: Prisma.EnumMaintenanceRequestStatusFilter<"DecisionHistory"> | $Enums.MaintenanceRequestStatus;
    actorId?: Prisma.IntFilter<"DecisionHistory"> | number;
    comment?: Prisma.StringNullableFilter<"DecisionHistory"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"DecisionHistory"> | Date | string;
    request?: Prisma.XOR<Prisma.MaintenanceRequestScalarRelationFilter, Prisma.MaintenanceRequestWhereInput>;
    actor?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type DecisionHistoryOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    requestId?: Prisma.SortOrder;
    previousStatus?: Prisma.SortOrder;
    newStatus?: Prisma.SortOrder;
    actorId?: Prisma.SortOrder;
    comment?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    request?: Prisma.MaintenanceRequestOrderByWithRelationInput;
    actor?: Prisma.UserOrderByWithRelationInput;
};
export type DecisionHistoryWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    AND?: Prisma.DecisionHistoryWhereInput | Prisma.DecisionHistoryWhereInput[];
    OR?: Prisma.DecisionHistoryWhereInput[];
    NOT?: Prisma.DecisionHistoryWhereInput | Prisma.DecisionHistoryWhereInput[];
    requestId?: Prisma.IntFilter<"DecisionHistory"> | number;
    previousStatus?: Prisma.EnumMaintenanceRequestStatusFilter<"DecisionHistory"> | $Enums.MaintenanceRequestStatus;
    newStatus?: Prisma.EnumMaintenanceRequestStatusFilter<"DecisionHistory"> | $Enums.MaintenanceRequestStatus;
    actorId?: Prisma.IntFilter<"DecisionHistory"> | number;
    comment?: Prisma.StringNullableFilter<"DecisionHistory"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"DecisionHistory"> | Date | string;
    request?: Prisma.XOR<Prisma.MaintenanceRequestScalarRelationFilter, Prisma.MaintenanceRequestWhereInput>;
    actor?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id">;
export type DecisionHistoryOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    requestId?: Prisma.SortOrder;
    previousStatus?: Prisma.SortOrder;
    newStatus?: Prisma.SortOrder;
    actorId?: Prisma.SortOrder;
    comment?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.DecisionHistoryCountOrderByAggregateInput;
    _avg?: Prisma.DecisionHistoryAvgOrderByAggregateInput;
    _max?: Prisma.DecisionHistoryMaxOrderByAggregateInput;
    _min?: Prisma.DecisionHistoryMinOrderByAggregateInput;
    _sum?: Prisma.DecisionHistorySumOrderByAggregateInput;
};
export type DecisionHistoryScalarWhereWithAggregatesInput = {
    AND?: Prisma.DecisionHistoryScalarWhereWithAggregatesInput | Prisma.DecisionHistoryScalarWhereWithAggregatesInput[];
    OR?: Prisma.DecisionHistoryScalarWhereWithAggregatesInput[];
    NOT?: Prisma.DecisionHistoryScalarWhereWithAggregatesInput | Prisma.DecisionHistoryScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"DecisionHistory"> | number;
    requestId?: Prisma.IntWithAggregatesFilter<"DecisionHistory"> | number;
    previousStatus?: Prisma.EnumMaintenanceRequestStatusWithAggregatesFilter<"DecisionHistory"> | $Enums.MaintenanceRequestStatus;
    newStatus?: Prisma.EnumMaintenanceRequestStatusWithAggregatesFilter<"DecisionHistory"> | $Enums.MaintenanceRequestStatus;
    actorId?: Prisma.IntWithAggregatesFilter<"DecisionHistory"> | number;
    comment?: Prisma.StringNullableWithAggregatesFilter<"DecisionHistory"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"DecisionHistory"> | Date | string;
};
export type DecisionHistoryCreateInput = {
    previousStatus: $Enums.MaintenanceRequestStatus;
    newStatus: $Enums.MaintenanceRequestStatus;
    comment?: string | null;
    createdAt?: Date | string;
    request: Prisma.MaintenanceRequestCreateNestedOneWithoutDecisionHistoryInput;
    actor: Prisma.UserCreateNestedOneWithoutDecisionHistoryEntriesInput;
};
export type DecisionHistoryUncheckedCreateInput = {
    id?: number;
    requestId: number;
    previousStatus: $Enums.MaintenanceRequestStatus;
    newStatus: $Enums.MaintenanceRequestStatus;
    actorId: number;
    comment?: string | null;
    createdAt?: Date | string;
};
export type DecisionHistoryUpdateInput = {
    previousStatus?: Prisma.EnumMaintenanceRequestStatusFieldUpdateOperationsInput | $Enums.MaintenanceRequestStatus;
    newStatus?: Prisma.EnumMaintenanceRequestStatusFieldUpdateOperationsInput | $Enums.MaintenanceRequestStatus;
    comment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    request?: Prisma.MaintenanceRequestUpdateOneRequiredWithoutDecisionHistoryNestedInput;
    actor?: Prisma.UserUpdateOneRequiredWithoutDecisionHistoryEntriesNestedInput;
};
export type DecisionHistoryUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    requestId?: Prisma.IntFieldUpdateOperationsInput | number;
    previousStatus?: Prisma.EnumMaintenanceRequestStatusFieldUpdateOperationsInput | $Enums.MaintenanceRequestStatus;
    newStatus?: Prisma.EnumMaintenanceRequestStatusFieldUpdateOperationsInput | $Enums.MaintenanceRequestStatus;
    actorId?: Prisma.IntFieldUpdateOperationsInput | number;
    comment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DecisionHistoryCreateManyInput = {
    id?: number;
    requestId: number;
    previousStatus: $Enums.MaintenanceRequestStatus;
    newStatus: $Enums.MaintenanceRequestStatus;
    actorId: number;
    comment?: string | null;
    createdAt?: Date | string;
};
export type DecisionHistoryUpdateManyMutationInput = {
    previousStatus?: Prisma.EnumMaintenanceRequestStatusFieldUpdateOperationsInput | $Enums.MaintenanceRequestStatus;
    newStatus?: Prisma.EnumMaintenanceRequestStatusFieldUpdateOperationsInput | $Enums.MaintenanceRequestStatus;
    comment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DecisionHistoryUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    requestId?: Prisma.IntFieldUpdateOperationsInput | number;
    previousStatus?: Prisma.EnumMaintenanceRequestStatusFieldUpdateOperationsInput | $Enums.MaintenanceRequestStatus;
    newStatus?: Prisma.EnumMaintenanceRequestStatusFieldUpdateOperationsInput | $Enums.MaintenanceRequestStatus;
    actorId?: Prisma.IntFieldUpdateOperationsInput | number;
    comment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DecisionHistoryListRelationFilter = {
    every?: Prisma.DecisionHistoryWhereInput;
    some?: Prisma.DecisionHistoryWhereInput;
    none?: Prisma.DecisionHistoryWhereInput;
};
export type DecisionHistoryOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type DecisionHistoryCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    requestId?: Prisma.SortOrder;
    previousStatus?: Prisma.SortOrder;
    newStatus?: Prisma.SortOrder;
    actorId?: Prisma.SortOrder;
    comment?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type DecisionHistoryAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    requestId?: Prisma.SortOrder;
    actorId?: Prisma.SortOrder;
};
export type DecisionHistoryMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    requestId?: Prisma.SortOrder;
    previousStatus?: Prisma.SortOrder;
    newStatus?: Prisma.SortOrder;
    actorId?: Prisma.SortOrder;
    comment?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type DecisionHistoryMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    requestId?: Prisma.SortOrder;
    previousStatus?: Prisma.SortOrder;
    newStatus?: Prisma.SortOrder;
    actorId?: Prisma.SortOrder;
    comment?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type DecisionHistorySumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    requestId?: Prisma.SortOrder;
    actorId?: Prisma.SortOrder;
};
export type DecisionHistoryCreateNestedManyWithoutActorInput = {
    create?: Prisma.XOR<Prisma.DecisionHistoryCreateWithoutActorInput, Prisma.DecisionHistoryUncheckedCreateWithoutActorInput> | Prisma.DecisionHistoryCreateWithoutActorInput[] | Prisma.DecisionHistoryUncheckedCreateWithoutActorInput[];
    connectOrCreate?: Prisma.DecisionHistoryCreateOrConnectWithoutActorInput | Prisma.DecisionHistoryCreateOrConnectWithoutActorInput[];
    createMany?: Prisma.DecisionHistoryCreateManyActorInputEnvelope;
    connect?: Prisma.DecisionHistoryWhereUniqueInput | Prisma.DecisionHistoryWhereUniqueInput[];
};
export type DecisionHistoryUncheckedCreateNestedManyWithoutActorInput = {
    create?: Prisma.XOR<Prisma.DecisionHistoryCreateWithoutActorInput, Prisma.DecisionHistoryUncheckedCreateWithoutActorInput> | Prisma.DecisionHistoryCreateWithoutActorInput[] | Prisma.DecisionHistoryUncheckedCreateWithoutActorInput[];
    connectOrCreate?: Prisma.DecisionHistoryCreateOrConnectWithoutActorInput | Prisma.DecisionHistoryCreateOrConnectWithoutActorInput[];
    createMany?: Prisma.DecisionHistoryCreateManyActorInputEnvelope;
    connect?: Prisma.DecisionHistoryWhereUniqueInput | Prisma.DecisionHistoryWhereUniqueInput[];
};
export type DecisionHistoryUpdateManyWithoutActorNestedInput = {
    create?: Prisma.XOR<Prisma.DecisionHistoryCreateWithoutActorInput, Prisma.DecisionHistoryUncheckedCreateWithoutActorInput> | Prisma.DecisionHistoryCreateWithoutActorInput[] | Prisma.DecisionHistoryUncheckedCreateWithoutActorInput[];
    connectOrCreate?: Prisma.DecisionHistoryCreateOrConnectWithoutActorInput | Prisma.DecisionHistoryCreateOrConnectWithoutActorInput[];
    upsert?: Prisma.DecisionHistoryUpsertWithWhereUniqueWithoutActorInput | Prisma.DecisionHistoryUpsertWithWhereUniqueWithoutActorInput[];
    createMany?: Prisma.DecisionHistoryCreateManyActorInputEnvelope;
    set?: Prisma.DecisionHistoryWhereUniqueInput | Prisma.DecisionHistoryWhereUniqueInput[];
    disconnect?: Prisma.DecisionHistoryWhereUniqueInput | Prisma.DecisionHistoryWhereUniqueInput[];
    delete?: Prisma.DecisionHistoryWhereUniqueInput | Prisma.DecisionHistoryWhereUniqueInput[];
    connect?: Prisma.DecisionHistoryWhereUniqueInput | Prisma.DecisionHistoryWhereUniqueInput[];
    update?: Prisma.DecisionHistoryUpdateWithWhereUniqueWithoutActorInput | Prisma.DecisionHistoryUpdateWithWhereUniqueWithoutActorInput[];
    updateMany?: Prisma.DecisionHistoryUpdateManyWithWhereWithoutActorInput | Prisma.DecisionHistoryUpdateManyWithWhereWithoutActorInput[];
    deleteMany?: Prisma.DecisionHistoryScalarWhereInput | Prisma.DecisionHistoryScalarWhereInput[];
};
export type DecisionHistoryUncheckedUpdateManyWithoutActorNestedInput = {
    create?: Prisma.XOR<Prisma.DecisionHistoryCreateWithoutActorInput, Prisma.DecisionHistoryUncheckedCreateWithoutActorInput> | Prisma.DecisionHistoryCreateWithoutActorInput[] | Prisma.DecisionHistoryUncheckedCreateWithoutActorInput[];
    connectOrCreate?: Prisma.DecisionHistoryCreateOrConnectWithoutActorInput | Prisma.DecisionHistoryCreateOrConnectWithoutActorInput[];
    upsert?: Prisma.DecisionHistoryUpsertWithWhereUniqueWithoutActorInput | Prisma.DecisionHistoryUpsertWithWhereUniqueWithoutActorInput[];
    createMany?: Prisma.DecisionHistoryCreateManyActorInputEnvelope;
    set?: Prisma.DecisionHistoryWhereUniqueInput | Prisma.DecisionHistoryWhereUniqueInput[];
    disconnect?: Prisma.DecisionHistoryWhereUniqueInput | Prisma.DecisionHistoryWhereUniqueInput[];
    delete?: Prisma.DecisionHistoryWhereUniqueInput | Prisma.DecisionHistoryWhereUniqueInput[];
    connect?: Prisma.DecisionHistoryWhereUniqueInput | Prisma.DecisionHistoryWhereUniqueInput[];
    update?: Prisma.DecisionHistoryUpdateWithWhereUniqueWithoutActorInput | Prisma.DecisionHistoryUpdateWithWhereUniqueWithoutActorInput[];
    updateMany?: Prisma.DecisionHistoryUpdateManyWithWhereWithoutActorInput | Prisma.DecisionHistoryUpdateManyWithWhereWithoutActorInput[];
    deleteMany?: Prisma.DecisionHistoryScalarWhereInput | Prisma.DecisionHistoryScalarWhereInput[];
};
export type DecisionHistoryCreateNestedManyWithoutRequestInput = {
    create?: Prisma.XOR<Prisma.DecisionHistoryCreateWithoutRequestInput, Prisma.DecisionHistoryUncheckedCreateWithoutRequestInput> | Prisma.DecisionHistoryCreateWithoutRequestInput[] | Prisma.DecisionHistoryUncheckedCreateWithoutRequestInput[];
    connectOrCreate?: Prisma.DecisionHistoryCreateOrConnectWithoutRequestInput | Prisma.DecisionHistoryCreateOrConnectWithoutRequestInput[];
    createMany?: Prisma.DecisionHistoryCreateManyRequestInputEnvelope;
    connect?: Prisma.DecisionHistoryWhereUniqueInput | Prisma.DecisionHistoryWhereUniqueInput[];
};
export type DecisionHistoryUncheckedCreateNestedManyWithoutRequestInput = {
    create?: Prisma.XOR<Prisma.DecisionHistoryCreateWithoutRequestInput, Prisma.DecisionHistoryUncheckedCreateWithoutRequestInput> | Prisma.DecisionHistoryCreateWithoutRequestInput[] | Prisma.DecisionHistoryUncheckedCreateWithoutRequestInput[];
    connectOrCreate?: Prisma.DecisionHistoryCreateOrConnectWithoutRequestInput | Prisma.DecisionHistoryCreateOrConnectWithoutRequestInput[];
    createMany?: Prisma.DecisionHistoryCreateManyRequestInputEnvelope;
    connect?: Prisma.DecisionHistoryWhereUniqueInput | Prisma.DecisionHistoryWhereUniqueInput[];
};
export type DecisionHistoryUpdateManyWithoutRequestNestedInput = {
    create?: Prisma.XOR<Prisma.DecisionHistoryCreateWithoutRequestInput, Prisma.DecisionHistoryUncheckedCreateWithoutRequestInput> | Prisma.DecisionHistoryCreateWithoutRequestInput[] | Prisma.DecisionHistoryUncheckedCreateWithoutRequestInput[];
    connectOrCreate?: Prisma.DecisionHistoryCreateOrConnectWithoutRequestInput | Prisma.DecisionHistoryCreateOrConnectWithoutRequestInput[];
    upsert?: Prisma.DecisionHistoryUpsertWithWhereUniqueWithoutRequestInput | Prisma.DecisionHistoryUpsertWithWhereUniqueWithoutRequestInput[];
    createMany?: Prisma.DecisionHistoryCreateManyRequestInputEnvelope;
    set?: Prisma.DecisionHistoryWhereUniqueInput | Prisma.DecisionHistoryWhereUniqueInput[];
    disconnect?: Prisma.DecisionHistoryWhereUniqueInput | Prisma.DecisionHistoryWhereUniqueInput[];
    delete?: Prisma.DecisionHistoryWhereUniqueInput | Prisma.DecisionHistoryWhereUniqueInput[];
    connect?: Prisma.DecisionHistoryWhereUniqueInput | Prisma.DecisionHistoryWhereUniqueInput[];
    update?: Prisma.DecisionHistoryUpdateWithWhereUniqueWithoutRequestInput | Prisma.DecisionHistoryUpdateWithWhereUniqueWithoutRequestInput[];
    updateMany?: Prisma.DecisionHistoryUpdateManyWithWhereWithoutRequestInput | Prisma.DecisionHistoryUpdateManyWithWhereWithoutRequestInput[];
    deleteMany?: Prisma.DecisionHistoryScalarWhereInput | Prisma.DecisionHistoryScalarWhereInput[];
};
export type DecisionHistoryUncheckedUpdateManyWithoutRequestNestedInput = {
    create?: Prisma.XOR<Prisma.DecisionHistoryCreateWithoutRequestInput, Prisma.DecisionHistoryUncheckedCreateWithoutRequestInput> | Prisma.DecisionHistoryCreateWithoutRequestInput[] | Prisma.DecisionHistoryUncheckedCreateWithoutRequestInput[];
    connectOrCreate?: Prisma.DecisionHistoryCreateOrConnectWithoutRequestInput | Prisma.DecisionHistoryCreateOrConnectWithoutRequestInput[];
    upsert?: Prisma.DecisionHistoryUpsertWithWhereUniqueWithoutRequestInput | Prisma.DecisionHistoryUpsertWithWhereUniqueWithoutRequestInput[];
    createMany?: Prisma.DecisionHistoryCreateManyRequestInputEnvelope;
    set?: Prisma.DecisionHistoryWhereUniqueInput | Prisma.DecisionHistoryWhereUniqueInput[];
    disconnect?: Prisma.DecisionHistoryWhereUniqueInput | Prisma.DecisionHistoryWhereUniqueInput[];
    delete?: Prisma.DecisionHistoryWhereUniqueInput | Prisma.DecisionHistoryWhereUniqueInput[];
    connect?: Prisma.DecisionHistoryWhereUniqueInput | Prisma.DecisionHistoryWhereUniqueInput[];
    update?: Prisma.DecisionHistoryUpdateWithWhereUniqueWithoutRequestInput | Prisma.DecisionHistoryUpdateWithWhereUniqueWithoutRequestInput[];
    updateMany?: Prisma.DecisionHistoryUpdateManyWithWhereWithoutRequestInput | Prisma.DecisionHistoryUpdateManyWithWhereWithoutRequestInput[];
    deleteMany?: Prisma.DecisionHistoryScalarWhereInput | Prisma.DecisionHistoryScalarWhereInput[];
};
export type DecisionHistoryCreateWithoutActorInput = {
    previousStatus: $Enums.MaintenanceRequestStatus;
    newStatus: $Enums.MaintenanceRequestStatus;
    comment?: string | null;
    createdAt?: Date | string;
    request: Prisma.MaintenanceRequestCreateNestedOneWithoutDecisionHistoryInput;
};
export type DecisionHistoryUncheckedCreateWithoutActorInput = {
    id?: number;
    requestId: number;
    previousStatus: $Enums.MaintenanceRequestStatus;
    newStatus: $Enums.MaintenanceRequestStatus;
    comment?: string | null;
    createdAt?: Date | string;
};
export type DecisionHistoryCreateOrConnectWithoutActorInput = {
    where: Prisma.DecisionHistoryWhereUniqueInput;
    create: Prisma.XOR<Prisma.DecisionHistoryCreateWithoutActorInput, Prisma.DecisionHistoryUncheckedCreateWithoutActorInput>;
};
export type DecisionHistoryCreateManyActorInputEnvelope = {
    data: Prisma.DecisionHistoryCreateManyActorInput | Prisma.DecisionHistoryCreateManyActorInput[];
    skipDuplicates?: boolean;
};
export type DecisionHistoryUpsertWithWhereUniqueWithoutActorInput = {
    where: Prisma.DecisionHistoryWhereUniqueInput;
    update: Prisma.XOR<Prisma.DecisionHistoryUpdateWithoutActorInput, Prisma.DecisionHistoryUncheckedUpdateWithoutActorInput>;
    create: Prisma.XOR<Prisma.DecisionHistoryCreateWithoutActorInput, Prisma.DecisionHistoryUncheckedCreateWithoutActorInput>;
};
export type DecisionHistoryUpdateWithWhereUniqueWithoutActorInput = {
    where: Prisma.DecisionHistoryWhereUniqueInput;
    data: Prisma.XOR<Prisma.DecisionHistoryUpdateWithoutActorInput, Prisma.DecisionHistoryUncheckedUpdateWithoutActorInput>;
};
export type DecisionHistoryUpdateManyWithWhereWithoutActorInput = {
    where: Prisma.DecisionHistoryScalarWhereInput;
    data: Prisma.XOR<Prisma.DecisionHistoryUpdateManyMutationInput, Prisma.DecisionHistoryUncheckedUpdateManyWithoutActorInput>;
};
export type DecisionHistoryScalarWhereInput = {
    AND?: Prisma.DecisionHistoryScalarWhereInput | Prisma.DecisionHistoryScalarWhereInput[];
    OR?: Prisma.DecisionHistoryScalarWhereInput[];
    NOT?: Prisma.DecisionHistoryScalarWhereInput | Prisma.DecisionHistoryScalarWhereInput[];
    id?: Prisma.IntFilter<"DecisionHistory"> | number;
    requestId?: Prisma.IntFilter<"DecisionHistory"> | number;
    previousStatus?: Prisma.EnumMaintenanceRequestStatusFilter<"DecisionHistory"> | $Enums.MaintenanceRequestStatus;
    newStatus?: Prisma.EnumMaintenanceRequestStatusFilter<"DecisionHistory"> | $Enums.MaintenanceRequestStatus;
    actorId?: Prisma.IntFilter<"DecisionHistory"> | number;
    comment?: Prisma.StringNullableFilter<"DecisionHistory"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"DecisionHistory"> | Date | string;
};
export type DecisionHistoryCreateWithoutRequestInput = {
    previousStatus: $Enums.MaintenanceRequestStatus;
    newStatus: $Enums.MaintenanceRequestStatus;
    comment?: string | null;
    createdAt?: Date | string;
    actor: Prisma.UserCreateNestedOneWithoutDecisionHistoryEntriesInput;
};
export type DecisionHistoryUncheckedCreateWithoutRequestInput = {
    id?: number;
    previousStatus: $Enums.MaintenanceRequestStatus;
    newStatus: $Enums.MaintenanceRequestStatus;
    actorId: number;
    comment?: string | null;
    createdAt?: Date | string;
};
export type DecisionHistoryCreateOrConnectWithoutRequestInput = {
    where: Prisma.DecisionHistoryWhereUniqueInput;
    create: Prisma.XOR<Prisma.DecisionHistoryCreateWithoutRequestInput, Prisma.DecisionHistoryUncheckedCreateWithoutRequestInput>;
};
export type DecisionHistoryCreateManyRequestInputEnvelope = {
    data: Prisma.DecisionHistoryCreateManyRequestInput | Prisma.DecisionHistoryCreateManyRequestInput[];
    skipDuplicates?: boolean;
};
export type DecisionHistoryUpsertWithWhereUniqueWithoutRequestInput = {
    where: Prisma.DecisionHistoryWhereUniqueInput;
    update: Prisma.XOR<Prisma.DecisionHistoryUpdateWithoutRequestInput, Prisma.DecisionHistoryUncheckedUpdateWithoutRequestInput>;
    create: Prisma.XOR<Prisma.DecisionHistoryCreateWithoutRequestInput, Prisma.DecisionHistoryUncheckedCreateWithoutRequestInput>;
};
export type DecisionHistoryUpdateWithWhereUniqueWithoutRequestInput = {
    where: Prisma.DecisionHistoryWhereUniqueInput;
    data: Prisma.XOR<Prisma.DecisionHistoryUpdateWithoutRequestInput, Prisma.DecisionHistoryUncheckedUpdateWithoutRequestInput>;
};
export type DecisionHistoryUpdateManyWithWhereWithoutRequestInput = {
    where: Prisma.DecisionHistoryScalarWhereInput;
    data: Prisma.XOR<Prisma.DecisionHistoryUpdateManyMutationInput, Prisma.DecisionHistoryUncheckedUpdateManyWithoutRequestInput>;
};
export type DecisionHistoryCreateManyActorInput = {
    id?: number;
    requestId: number;
    previousStatus: $Enums.MaintenanceRequestStatus;
    newStatus: $Enums.MaintenanceRequestStatus;
    comment?: string | null;
    createdAt?: Date | string;
};
export type DecisionHistoryUpdateWithoutActorInput = {
    previousStatus?: Prisma.EnumMaintenanceRequestStatusFieldUpdateOperationsInput | $Enums.MaintenanceRequestStatus;
    newStatus?: Prisma.EnumMaintenanceRequestStatusFieldUpdateOperationsInput | $Enums.MaintenanceRequestStatus;
    comment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    request?: Prisma.MaintenanceRequestUpdateOneRequiredWithoutDecisionHistoryNestedInput;
};
export type DecisionHistoryUncheckedUpdateWithoutActorInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    requestId?: Prisma.IntFieldUpdateOperationsInput | number;
    previousStatus?: Prisma.EnumMaintenanceRequestStatusFieldUpdateOperationsInput | $Enums.MaintenanceRequestStatus;
    newStatus?: Prisma.EnumMaintenanceRequestStatusFieldUpdateOperationsInput | $Enums.MaintenanceRequestStatus;
    comment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DecisionHistoryUncheckedUpdateManyWithoutActorInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    requestId?: Prisma.IntFieldUpdateOperationsInput | number;
    previousStatus?: Prisma.EnumMaintenanceRequestStatusFieldUpdateOperationsInput | $Enums.MaintenanceRequestStatus;
    newStatus?: Prisma.EnumMaintenanceRequestStatusFieldUpdateOperationsInput | $Enums.MaintenanceRequestStatus;
    comment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DecisionHistoryCreateManyRequestInput = {
    id?: number;
    previousStatus: $Enums.MaintenanceRequestStatus;
    newStatus: $Enums.MaintenanceRequestStatus;
    actorId: number;
    comment?: string | null;
    createdAt?: Date | string;
};
export type DecisionHistoryUpdateWithoutRequestInput = {
    previousStatus?: Prisma.EnumMaintenanceRequestStatusFieldUpdateOperationsInput | $Enums.MaintenanceRequestStatus;
    newStatus?: Prisma.EnumMaintenanceRequestStatusFieldUpdateOperationsInput | $Enums.MaintenanceRequestStatus;
    comment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    actor?: Prisma.UserUpdateOneRequiredWithoutDecisionHistoryEntriesNestedInput;
};
export type DecisionHistoryUncheckedUpdateWithoutRequestInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    previousStatus?: Prisma.EnumMaintenanceRequestStatusFieldUpdateOperationsInput | $Enums.MaintenanceRequestStatus;
    newStatus?: Prisma.EnumMaintenanceRequestStatusFieldUpdateOperationsInput | $Enums.MaintenanceRequestStatus;
    actorId?: Prisma.IntFieldUpdateOperationsInput | number;
    comment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DecisionHistoryUncheckedUpdateManyWithoutRequestInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    previousStatus?: Prisma.EnumMaintenanceRequestStatusFieldUpdateOperationsInput | $Enums.MaintenanceRequestStatus;
    newStatus?: Prisma.EnumMaintenanceRequestStatusFieldUpdateOperationsInput | $Enums.MaintenanceRequestStatus;
    actorId?: Prisma.IntFieldUpdateOperationsInput | number;
    comment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DecisionHistorySelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    requestId?: boolean;
    previousStatus?: boolean;
    newStatus?: boolean;
    actorId?: boolean;
    comment?: boolean;
    createdAt?: boolean;
    request?: boolean | Prisma.MaintenanceRequestDefaultArgs<ExtArgs>;
    actor?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["decisionHistory"]>;
export type DecisionHistorySelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    requestId?: boolean;
    previousStatus?: boolean;
    newStatus?: boolean;
    actorId?: boolean;
    comment?: boolean;
    createdAt?: boolean;
    request?: boolean | Prisma.MaintenanceRequestDefaultArgs<ExtArgs>;
    actor?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["decisionHistory"]>;
export type DecisionHistorySelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    requestId?: boolean;
    previousStatus?: boolean;
    newStatus?: boolean;
    actorId?: boolean;
    comment?: boolean;
    createdAt?: boolean;
    request?: boolean | Prisma.MaintenanceRequestDefaultArgs<ExtArgs>;
    actor?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["decisionHistory"]>;
export type DecisionHistorySelectScalar = {
    id?: boolean;
    requestId?: boolean;
    previousStatus?: boolean;
    newStatus?: boolean;
    actorId?: boolean;
    comment?: boolean;
    createdAt?: boolean;
};
export type DecisionHistoryOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "requestId" | "previousStatus" | "newStatus" | "actorId" | "comment" | "createdAt", ExtArgs["result"]["decisionHistory"]>;
export type DecisionHistoryInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    request?: boolean | Prisma.MaintenanceRequestDefaultArgs<ExtArgs>;
    actor?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type DecisionHistoryIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    request?: boolean | Prisma.MaintenanceRequestDefaultArgs<ExtArgs>;
    actor?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type DecisionHistoryIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    request?: boolean | Prisma.MaintenanceRequestDefaultArgs<ExtArgs>;
    actor?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $DecisionHistoryPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "DecisionHistory";
    objects: {
        request: Prisma.$MaintenanceRequestPayload<ExtArgs>;
        actor: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        requestId: number;
        previousStatus: $Enums.MaintenanceRequestStatus;
        newStatus: $Enums.MaintenanceRequestStatus;
        actorId: number;
        comment: string | null;
        createdAt: Date;
    }, ExtArgs["result"]["decisionHistory"]>;
    composites: {};
};
export type DecisionHistoryGetPayload<S extends boolean | null | undefined | DecisionHistoryDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$DecisionHistoryPayload, S>;
export type DecisionHistoryCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<DecisionHistoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: DecisionHistoryCountAggregateInputType | true;
};
export interface DecisionHistoryDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['DecisionHistory'];
        meta: {
            name: 'DecisionHistory';
        };
    };
    /**
     * Find zero or one DecisionHistory that matches the filter.
     * @param {DecisionHistoryFindUniqueArgs} args - Arguments to find a DecisionHistory
     * @example
     * // Get one DecisionHistory
     * const decisionHistory = await prisma.decisionHistory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DecisionHistoryFindUniqueArgs>(args: Prisma.SelectSubset<T, DecisionHistoryFindUniqueArgs<ExtArgs>>): Prisma.Prisma__DecisionHistoryClient<runtime.Types.Result.GetResult<Prisma.$DecisionHistoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one DecisionHistory that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DecisionHistoryFindUniqueOrThrowArgs} args - Arguments to find a DecisionHistory
     * @example
     * // Get one DecisionHistory
     * const decisionHistory = await prisma.decisionHistory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DecisionHistoryFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, DecisionHistoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__DecisionHistoryClient<runtime.Types.Result.GetResult<Prisma.$DecisionHistoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first DecisionHistory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DecisionHistoryFindFirstArgs} args - Arguments to find a DecisionHistory
     * @example
     * // Get one DecisionHistory
     * const decisionHistory = await prisma.decisionHistory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DecisionHistoryFindFirstArgs>(args?: Prisma.SelectSubset<T, DecisionHistoryFindFirstArgs<ExtArgs>>): Prisma.Prisma__DecisionHistoryClient<runtime.Types.Result.GetResult<Prisma.$DecisionHistoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first DecisionHistory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DecisionHistoryFindFirstOrThrowArgs} args - Arguments to find a DecisionHistory
     * @example
     * // Get one DecisionHistory
     * const decisionHistory = await prisma.decisionHistory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DecisionHistoryFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, DecisionHistoryFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__DecisionHistoryClient<runtime.Types.Result.GetResult<Prisma.$DecisionHistoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more DecisionHistories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DecisionHistoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DecisionHistories
     * const decisionHistories = await prisma.decisionHistory.findMany()
     *
     * // Get first 10 DecisionHistories
     * const decisionHistories = await prisma.decisionHistory.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const decisionHistoryWithIdOnly = await prisma.decisionHistory.findMany({ select: { id: true } })
     *
     */
    findMany<T extends DecisionHistoryFindManyArgs>(args?: Prisma.SelectSubset<T, DecisionHistoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DecisionHistoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a DecisionHistory.
     * @param {DecisionHistoryCreateArgs} args - Arguments to create a DecisionHistory.
     * @example
     * // Create one DecisionHistory
     * const DecisionHistory = await prisma.decisionHistory.create({
     *   data: {
     *     // ... data to create a DecisionHistory
     *   }
     * })
     *
     */
    create<T extends DecisionHistoryCreateArgs>(args: Prisma.SelectSubset<T, DecisionHistoryCreateArgs<ExtArgs>>): Prisma.Prisma__DecisionHistoryClient<runtime.Types.Result.GetResult<Prisma.$DecisionHistoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many DecisionHistories.
     * @param {DecisionHistoryCreateManyArgs} args - Arguments to create many DecisionHistories.
     * @example
     * // Create many DecisionHistories
     * const decisionHistory = await prisma.decisionHistory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends DecisionHistoryCreateManyArgs>(args?: Prisma.SelectSubset<T, DecisionHistoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many DecisionHistories and returns the data saved in the database.
     * @param {DecisionHistoryCreateManyAndReturnArgs} args - Arguments to create many DecisionHistories.
     * @example
     * // Create many DecisionHistories
     * const decisionHistory = await prisma.decisionHistory.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many DecisionHistories and only return the `id`
     * const decisionHistoryWithIdOnly = await prisma.decisionHistory.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends DecisionHistoryCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, DecisionHistoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DecisionHistoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a DecisionHistory.
     * @param {DecisionHistoryDeleteArgs} args - Arguments to delete one DecisionHistory.
     * @example
     * // Delete one DecisionHistory
     * const DecisionHistory = await prisma.decisionHistory.delete({
     *   where: {
     *     // ... filter to delete one DecisionHistory
     *   }
     * })
     *
     */
    delete<T extends DecisionHistoryDeleteArgs>(args: Prisma.SelectSubset<T, DecisionHistoryDeleteArgs<ExtArgs>>): Prisma.Prisma__DecisionHistoryClient<runtime.Types.Result.GetResult<Prisma.$DecisionHistoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one DecisionHistory.
     * @param {DecisionHistoryUpdateArgs} args - Arguments to update one DecisionHistory.
     * @example
     * // Update one DecisionHistory
     * const decisionHistory = await prisma.decisionHistory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends DecisionHistoryUpdateArgs>(args: Prisma.SelectSubset<T, DecisionHistoryUpdateArgs<ExtArgs>>): Prisma.Prisma__DecisionHistoryClient<runtime.Types.Result.GetResult<Prisma.$DecisionHistoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more DecisionHistories.
     * @param {DecisionHistoryDeleteManyArgs} args - Arguments to filter DecisionHistories to delete.
     * @example
     * // Delete a few DecisionHistories
     * const { count } = await prisma.decisionHistory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends DecisionHistoryDeleteManyArgs>(args?: Prisma.SelectSubset<T, DecisionHistoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more DecisionHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DecisionHistoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DecisionHistories
     * const decisionHistory = await prisma.decisionHistory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends DecisionHistoryUpdateManyArgs>(args: Prisma.SelectSubset<T, DecisionHistoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more DecisionHistories and returns the data updated in the database.
     * @param {DecisionHistoryUpdateManyAndReturnArgs} args - Arguments to update many DecisionHistories.
     * @example
     * // Update many DecisionHistories
     * const decisionHistory = await prisma.decisionHistory.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more DecisionHistories and only return the `id`
     * const decisionHistoryWithIdOnly = await prisma.decisionHistory.updateManyAndReturn({
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
    updateManyAndReturn<T extends DecisionHistoryUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, DecisionHistoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DecisionHistoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one DecisionHistory.
     * @param {DecisionHistoryUpsertArgs} args - Arguments to update or create a DecisionHistory.
     * @example
     * // Update or create a DecisionHistory
     * const decisionHistory = await prisma.decisionHistory.upsert({
     *   create: {
     *     // ... data to create a DecisionHistory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DecisionHistory we want to update
     *   }
     * })
     */
    upsert<T extends DecisionHistoryUpsertArgs>(args: Prisma.SelectSubset<T, DecisionHistoryUpsertArgs<ExtArgs>>): Prisma.Prisma__DecisionHistoryClient<runtime.Types.Result.GetResult<Prisma.$DecisionHistoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of DecisionHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DecisionHistoryCountArgs} args - Arguments to filter DecisionHistories to count.
     * @example
     * // Count the number of DecisionHistories
     * const count = await prisma.decisionHistory.count({
     *   where: {
     *     // ... the filter for the DecisionHistories we want to count
     *   }
     * })
    **/
    count<T extends DecisionHistoryCountArgs>(args?: Prisma.Subset<T, DecisionHistoryCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], DecisionHistoryCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a DecisionHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DecisionHistoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends DecisionHistoryAggregateArgs>(args: Prisma.Subset<T, DecisionHistoryAggregateArgs>): Prisma.PrismaPromise<GetDecisionHistoryAggregateType<T>>;
    /**
     * Group by DecisionHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DecisionHistoryGroupByArgs} args - Group by arguments.
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
    groupBy<T extends DecisionHistoryGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: DecisionHistoryGroupByArgs['orderBy'];
    } : {
        orderBy?: DecisionHistoryGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, DecisionHistoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDecisionHistoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the DecisionHistory model
     */
    readonly fields: DecisionHistoryFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for DecisionHistory.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__DecisionHistoryClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    request<T extends Prisma.MaintenanceRequestDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.MaintenanceRequestDefaultArgs<ExtArgs>>): Prisma.Prisma__MaintenanceRequestClient<runtime.Types.Result.GetResult<Prisma.$MaintenanceRequestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    actor<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the DecisionHistory model
 */
export interface DecisionHistoryFieldRefs {
    readonly id: Prisma.FieldRef<"DecisionHistory", 'Int'>;
    readonly requestId: Prisma.FieldRef<"DecisionHistory", 'Int'>;
    readonly previousStatus: Prisma.FieldRef<"DecisionHistory", 'MaintenanceRequestStatus'>;
    readonly newStatus: Prisma.FieldRef<"DecisionHistory", 'MaintenanceRequestStatus'>;
    readonly actorId: Prisma.FieldRef<"DecisionHistory", 'Int'>;
    readonly comment: Prisma.FieldRef<"DecisionHistory", 'String'>;
    readonly createdAt: Prisma.FieldRef<"DecisionHistory", 'DateTime'>;
}
/**
 * DecisionHistory findUnique
 */
export type DecisionHistoryFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DecisionHistory
     */
    select?: Prisma.DecisionHistorySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DecisionHistory
     */
    omit?: Prisma.DecisionHistoryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DecisionHistoryInclude<ExtArgs> | null;
    /**
     * Filter, which DecisionHistory to fetch.
     */
    where: Prisma.DecisionHistoryWhereUniqueInput;
};
/**
 * DecisionHistory findUniqueOrThrow
 */
export type DecisionHistoryFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DecisionHistory
     */
    select?: Prisma.DecisionHistorySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DecisionHistory
     */
    omit?: Prisma.DecisionHistoryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DecisionHistoryInclude<ExtArgs> | null;
    /**
     * Filter, which DecisionHistory to fetch.
     */
    where: Prisma.DecisionHistoryWhereUniqueInput;
};
/**
 * DecisionHistory findFirst
 */
export type DecisionHistoryFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DecisionHistory
     */
    select?: Prisma.DecisionHistorySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DecisionHistory
     */
    omit?: Prisma.DecisionHistoryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DecisionHistoryInclude<ExtArgs> | null;
    /**
     * Filter, which DecisionHistory to fetch.
     */
    where?: Prisma.DecisionHistoryWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of DecisionHistories to fetch.
     */
    orderBy?: Prisma.DecisionHistoryOrderByWithRelationInput | Prisma.DecisionHistoryOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for DecisionHistories.
     */
    cursor?: Prisma.DecisionHistoryWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` DecisionHistories from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` DecisionHistories.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of DecisionHistories.
     */
    distinct?: Prisma.DecisionHistoryScalarFieldEnum | Prisma.DecisionHistoryScalarFieldEnum[];
};
/**
 * DecisionHistory findFirstOrThrow
 */
export type DecisionHistoryFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DecisionHistory
     */
    select?: Prisma.DecisionHistorySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DecisionHistory
     */
    omit?: Prisma.DecisionHistoryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DecisionHistoryInclude<ExtArgs> | null;
    /**
     * Filter, which DecisionHistory to fetch.
     */
    where?: Prisma.DecisionHistoryWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of DecisionHistories to fetch.
     */
    orderBy?: Prisma.DecisionHistoryOrderByWithRelationInput | Prisma.DecisionHistoryOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for DecisionHistories.
     */
    cursor?: Prisma.DecisionHistoryWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` DecisionHistories from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` DecisionHistories.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of DecisionHistories.
     */
    distinct?: Prisma.DecisionHistoryScalarFieldEnum | Prisma.DecisionHistoryScalarFieldEnum[];
};
/**
 * DecisionHistory findMany
 */
export type DecisionHistoryFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DecisionHistory
     */
    select?: Prisma.DecisionHistorySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DecisionHistory
     */
    omit?: Prisma.DecisionHistoryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DecisionHistoryInclude<ExtArgs> | null;
    /**
     * Filter, which DecisionHistories to fetch.
     */
    where?: Prisma.DecisionHistoryWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of DecisionHistories to fetch.
     */
    orderBy?: Prisma.DecisionHistoryOrderByWithRelationInput | Prisma.DecisionHistoryOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing DecisionHistories.
     */
    cursor?: Prisma.DecisionHistoryWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` DecisionHistories from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` DecisionHistories.
     */
    skip?: number;
    distinct?: Prisma.DecisionHistoryScalarFieldEnum | Prisma.DecisionHistoryScalarFieldEnum[];
};
/**
 * DecisionHistory create
 */
export type DecisionHistoryCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DecisionHistory
     */
    select?: Prisma.DecisionHistorySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DecisionHistory
     */
    omit?: Prisma.DecisionHistoryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DecisionHistoryInclude<ExtArgs> | null;
    /**
     * The data needed to create a DecisionHistory.
     */
    data: Prisma.XOR<Prisma.DecisionHistoryCreateInput, Prisma.DecisionHistoryUncheckedCreateInput>;
};
/**
 * DecisionHistory createMany
 */
export type DecisionHistoryCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many DecisionHistories.
     */
    data: Prisma.DecisionHistoryCreateManyInput | Prisma.DecisionHistoryCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * DecisionHistory createManyAndReturn
 */
export type DecisionHistoryCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DecisionHistory
     */
    select?: Prisma.DecisionHistorySelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the DecisionHistory
     */
    omit?: Prisma.DecisionHistoryOmit<ExtArgs> | null;
    /**
     * The data used to create many DecisionHistories.
     */
    data: Prisma.DecisionHistoryCreateManyInput | Prisma.DecisionHistoryCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DecisionHistoryIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * DecisionHistory update
 */
export type DecisionHistoryUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DecisionHistory
     */
    select?: Prisma.DecisionHistorySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DecisionHistory
     */
    omit?: Prisma.DecisionHistoryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DecisionHistoryInclude<ExtArgs> | null;
    /**
     * The data needed to update a DecisionHistory.
     */
    data: Prisma.XOR<Prisma.DecisionHistoryUpdateInput, Prisma.DecisionHistoryUncheckedUpdateInput>;
    /**
     * Choose, which DecisionHistory to update.
     */
    where: Prisma.DecisionHistoryWhereUniqueInput;
};
/**
 * DecisionHistory updateMany
 */
export type DecisionHistoryUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update DecisionHistories.
     */
    data: Prisma.XOR<Prisma.DecisionHistoryUpdateManyMutationInput, Prisma.DecisionHistoryUncheckedUpdateManyInput>;
    /**
     * Filter which DecisionHistories to update
     */
    where?: Prisma.DecisionHistoryWhereInput;
    /**
     * Limit how many DecisionHistories to update.
     */
    limit?: number;
};
/**
 * DecisionHistory updateManyAndReturn
 */
export type DecisionHistoryUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DecisionHistory
     */
    select?: Prisma.DecisionHistorySelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the DecisionHistory
     */
    omit?: Prisma.DecisionHistoryOmit<ExtArgs> | null;
    /**
     * The data used to update DecisionHistories.
     */
    data: Prisma.XOR<Prisma.DecisionHistoryUpdateManyMutationInput, Prisma.DecisionHistoryUncheckedUpdateManyInput>;
    /**
     * Filter which DecisionHistories to update
     */
    where?: Prisma.DecisionHistoryWhereInput;
    /**
     * Limit how many DecisionHistories to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DecisionHistoryIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * DecisionHistory upsert
 */
export type DecisionHistoryUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DecisionHistory
     */
    select?: Prisma.DecisionHistorySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DecisionHistory
     */
    omit?: Prisma.DecisionHistoryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DecisionHistoryInclude<ExtArgs> | null;
    /**
     * The filter to search for the DecisionHistory to update in case it exists.
     */
    where: Prisma.DecisionHistoryWhereUniqueInput;
    /**
     * In case the DecisionHistory found by the `where` argument doesn't exist, create a new DecisionHistory with this data.
     */
    create: Prisma.XOR<Prisma.DecisionHistoryCreateInput, Prisma.DecisionHistoryUncheckedCreateInput>;
    /**
     * In case the DecisionHistory was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.DecisionHistoryUpdateInput, Prisma.DecisionHistoryUncheckedUpdateInput>;
};
/**
 * DecisionHistory delete
 */
export type DecisionHistoryDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DecisionHistory
     */
    select?: Prisma.DecisionHistorySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DecisionHistory
     */
    omit?: Prisma.DecisionHistoryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DecisionHistoryInclude<ExtArgs> | null;
    /**
     * Filter which DecisionHistory to delete.
     */
    where: Prisma.DecisionHistoryWhereUniqueInput;
};
/**
 * DecisionHistory deleteMany
 */
export type DecisionHistoryDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which DecisionHistories to delete
     */
    where?: Prisma.DecisionHistoryWhereInput;
    /**
     * Limit how many DecisionHistories to delete.
     */
    limit?: number;
};
/**
 * DecisionHistory without action
 */
export type DecisionHistoryDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DecisionHistory
     */
    select?: Prisma.DecisionHistorySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DecisionHistory
     */
    omit?: Prisma.DecisionHistoryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DecisionHistoryInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=DecisionHistory.d.ts.map