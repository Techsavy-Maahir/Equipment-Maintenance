import type * as runtime from "@prisma/client/runtime/library";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model MaintenanceOccurrence
 *
 */
export type MaintenanceOccurrenceModel = runtime.Types.Result.DefaultSelection<Prisma.$MaintenanceOccurrencePayload>;
export type AggregateMaintenanceOccurrence = {
    _count: MaintenanceOccurrenceCountAggregateOutputType | null;
    _avg: MaintenanceOccurrenceAvgAggregateOutputType | null;
    _sum: MaintenanceOccurrenceSumAggregateOutputType | null;
    _min: MaintenanceOccurrenceMinAggregateOutputType | null;
    _max: MaintenanceOccurrenceMaxAggregateOutputType | null;
};
export type MaintenanceOccurrenceAvgAggregateOutputType = {
    id: number | null;
    maintenancePlanId: number | null;
    completedById: number | null;
};
export type MaintenanceOccurrenceSumAggregateOutputType = {
    id: number | null;
    maintenancePlanId: number | null;
    completedById: number | null;
};
export type MaintenanceOccurrenceMinAggregateOutputType = {
    id: number | null;
    maintenancePlanId: number | null;
    dueDate: Date | null;
    status: $Enums.MaintenanceOccurrenceStatus | null;
    completedAt: Date | null;
    completedById: number | null;
    workPerformed: string | null;
    remarks: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type MaintenanceOccurrenceMaxAggregateOutputType = {
    id: number | null;
    maintenancePlanId: number | null;
    dueDate: Date | null;
    status: $Enums.MaintenanceOccurrenceStatus | null;
    completedAt: Date | null;
    completedById: number | null;
    workPerformed: string | null;
    remarks: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type MaintenanceOccurrenceCountAggregateOutputType = {
    id: number;
    maintenancePlanId: number;
    dueDate: number;
    status: number;
    completedAt: number;
    completedById: number;
    workPerformed: number;
    remarks: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type MaintenanceOccurrenceAvgAggregateInputType = {
    id?: true;
    maintenancePlanId?: true;
    completedById?: true;
};
export type MaintenanceOccurrenceSumAggregateInputType = {
    id?: true;
    maintenancePlanId?: true;
    completedById?: true;
};
export type MaintenanceOccurrenceMinAggregateInputType = {
    id?: true;
    maintenancePlanId?: true;
    dueDate?: true;
    status?: true;
    completedAt?: true;
    completedById?: true;
    workPerformed?: true;
    remarks?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type MaintenanceOccurrenceMaxAggregateInputType = {
    id?: true;
    maintenancePlanId?: true;
    dueDate?: true;
    status?: true;
    completedAt?: true;
    completedById?: true;
    workPerformed?: true;
    remarks?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type MaintenanceOccurrenceCountAggregateInputType = {
    id?: true;
    maintenancePlanId?: true;
    dueDate?: true;
    status?: true;
    completedAt?: true;
    completedById?: true;
    workPerformed?: true;
    remarks?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type MaintenanceOccurrenceAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which MaintenanceOccurrence to aggregate.
     */
    where?: Prisma.MaintenanceOccurrenceWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of MaintenanceOccurrences to fetch.
     */
    orderBy?: Prisma.MaintenanceOccurrenceOrderByWithRelationInput | Prisma.MaintenanceOccurrenceOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.MaintenanceOccurrenceWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` MaintenanceOccurrences from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` MaintenanceOccurrences.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned MaintenanceOccurrences
    **/
    _count?: true | MaintenanceOccurrenceCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: MaintenanceOccurrenceAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: MaintenanceOccurrenceSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: MaintenanceOccurrenceMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: MaintenanceOccurrenceMaxAggregateInputType;
};
export type GetMaintenanceOccurrenceAggregateType<T extends MaintenanceOccurrenceAggregateArgs> = {
    [P in keyof T & keyof AggregateMaintenanceOccurrence]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateMaintenanceOccurrence[P]> : Prisma.GetScalarType<T[P], AggregateMaintenanceOccurrence[P]>;
};
export type MaintenanceOccurrenceGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MaintenanceOccurrenceWhereInput;
    orderBy?: Prisma.MaintenanceOccurrenceOrderByWithAggregationInput | Prisma.MaintenanceOccurrenceOrderByWithAggregationInput[];
    by: Prisma.MaintenanceOccurrenceScalarFieldEnum[] | Prisma.MaintenanceOccurrenceScalarFieldEnum;
    having?: Prisma.MaintenanceOccurrenceScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: MaintenanceOccurrenceCountAggregateInputType | true;
    _avg?: MaintenanceOccurrenceAvgAggregateInputType;
    _sum?: MaintenanceOccurrenceSumAggregateInputType;
    _min?: MaintenanceOccurrenceMinAggregateInputType;
    _max?: MaintenanceOccurrenceMaxAggregateInputType;
};
export type MaintenanceOccurrenceGroupByOutputType = {
    id: number;
    maintenancePlanId: number;
    dueDate: Date;
    status: $Enums.MaintenanceOccurrenceStatus;
    completedAt: Date | null;
    completedById: number | null;
    workPerformed: string | null;
    remarks: string | null;
    createdAt: Date;
    updatedAt: Date;
    _count: MaintenanceOccurrenceCountAggregateOutputType | null;
    _avg: MaintenanceOccurrenceAvgAggregateOutputType | null;
    _sum: MaintenanceOccurrenceSumAggregateOutputType | null;
    _min: MaintenanceOccurrenceMinAggregateOutputType | null;
    _max: MaintenanceOccurrenceMaxAggregateOutputType | null;
};
type GetMaintenanceOccurrenceGroupByPayload<T extends MaintenanceOccurrenceGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<MaintenanceOccurrenceGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof MaintenanceOccurrenceGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], MaintenanceOccurrenceGroupByOutputType[P]> : Prisma.GetScalarType<T[P], MaintenanceOccurrenceGroupByOutputType[P]>;
}>>;
export type MaintenanceOccurrenceWhereInput = {
    AND?: Prisma.MaintenanceOccurrenceWhereInput | Prisma.MaintenanceOccurrenceWhereInput[];
    OR?: Prisma.MaintenanceOccurrenceWhereInput[];
    NOT?: Prisma.MaintenanceOccurrenceWhereInput | Prisma.MaintenanceOccurrenceWhereInput[];
    id?: Prisma.IntFilter<"MaintenanceOccurrence"> | number;
    maintenancePlanId?: Prisma.IntFilter<"MaintenanceOccurrence"> | number;
    dueDate?: Prisma.DateTimeFilter<"MaintenanceOccurrence"> | Date | string;
    status?: Prisma.EnumMaintenanceOccurrenceStatusFilter<"MaintenanceOccurrence"> | $Enums.MaintenanceOccurrenceStatus;
    completedAt?: Prisma.DateTimeNullableFilter<"MaintenanceOccurrence"> | Date | string | null;
    completedById?: Prisma.IntNullableFilter<"MaintenanceOccurrence"> | number | null;
    workPerformed?: Prisma.StringNullableFilter<"MaintenanceOccurrence"> | string | null;
    remarks?: Prisma.StringNullableFilter<"MaintenanceOccurrence"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"MaintenanceOccurrence"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"MaintenanceOccurrence"> | Date | string;
    maintenancePlan?: Prisma.XOR<Prisma.MaintenancePlanScalarRelationFilter, Prisma.MaintenancePlanWhereInput>;
    completedBy?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
    linkedWorkOrder?: Prisma.WorkOrderListRelationFilter;
    notifications?: Prisma.NotificationListRelationFilter;
};
export type MaintenanceOccurrenceOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    maintenancePlanId?: Prisma.SortOrder;
    dueDate?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    completedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    completedById?: Prisma.SortOrderInput | Prisma.SortOrder;
    workPerformed?: Prisma.SortOrderInput | Prisma.SortOrder;
    remarks?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    maintenancePlan?: Prisma.MaintenancePlanOrderByWithRelationInput;
    completedBy?: Prisma.UserOrderByWithRelationInput;
    linkedWorkOrder?: Prisma.WorkOrderOrderByRelationAggregateInput;
    notifications?: Prisma.NotificationOrderByRelationAggregateInput;
};
export type MaintenanceOccurrenceWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    maintenancePlanId_dueDate?: Prisma.MaintenanceOccurrenceMaintenancePlanIdDueDateCompoundUniqueInput;
    AND?: Prisma.MaintenanceOccurrenceWhereInput | Prisma.MaintenanceOccurrenceWhereInput[];
    OR?: Prisma.MaintenanceOccurrenceWhereInput[];
    NOT?: Prisma.MaintenanceOccurrenceWhereInput | Prisma.MaintenanceOccurrenceWhereInput[];
    maintenancePlanId?: Prisma.IntFilter<"MaintenanceOccurrence"> | number;
    dueDate?: Prisma.DateTimeFilter<"MaintenanceOccurrence"> | Date | string;
    status?: Prisma.EnumMaintenanceOccurrenceStatusFilter<"MaintenanceOccurrence"> | $Enums.MaintenanceOccurrenceStatus;
    completedAt?: Prisma.DateTimeNullableFilter<"MaintenanceOccurrence"> | Date | string | null;
    completedById?: Prisma.IntNullableFilter<"MaintenanceOccurrence"> | number | null;
    workPerformed?: Prisma.StringNullableFilter<"MaintenanceOccurrence"> | string | null;
    remarks?: Prisma.StringNullableFilter<"MaintenanceOccurrence"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"MaintenanceOccurrence"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"MaintenanceOccurrence"> | Date | string;
    maintenancePlan?: Prisma.XOR<Prisma.MaintenancePlanScalarRelationFilter, Prisma.MaintenancePlanWhereInput>;
    completedBy?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
    linkedWorkOrder?: Prisma.WorkOrderListRelationFilter;
    notifications?: Prisma.NotificationListRelationFilter;
}, "id" | "maintenancePlanId_dueDate">;
export type MaintenanceOccurrenceOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    maintenancePlanId?: Prisma.SortOrder;
    dueDate?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    completedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    completedById?: Prisma.SortOrderInput | Prisma.SortOrder;
    workPerformed?: Prisma.SortOrderInput | Prisma.SortOrder;
    remarks?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.MaintenanceOccurrenceCountOrderByAggregateInput;
    _avg?: Prisma.MaintenanceOccurrenceAvgOrderByAggregateInput;
    _max?: Prisma.MaintenanceOccurrenceMaxOrderByAggregateInput;
    _min?: Prisma.MaintenanceOccurrenceMinOrderByAggregateInput;
    _sum?: Prisma.MaintenanceOccurrenceSumOrderByAggregateInput;
};
export type MaintenanceOccurrenceScalarWhereWithAggregatesInput = {
    AND?: Prisma.MaintenanceOccurrenceScalarWhereWithAggregatesInput | Prisma.MaintenanceOccurrenceScalarWhereWithAggregatesInput[];
    OR?: Prisma.MaintenanceOccurrenceScalarWhereWithAggregatesInput[];
    NOT?: Prisma.MaintenanceOccurrenceScalarWhereWithAggregatesInput | Prisma.MaintenanceOccurrenceScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"MaintenanceOccurrence"> | number;
    maintenancePlanId?: Prisma.IntWithAggregatesFilter<"MaintenanceOccurrence"> | number;
    dueDate?: Prisma.DateTimeWithAggregatesFilter<"MaintenanceOccurrence"> | Date | string;
    status?: Prisma.EnumMaintenanceOccurrenceStatusWithAggregatesFilter<"MaintenanceOccurrence"> | $Enums.MaintenanceOccurrenceStatus;
    completedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"MaintenanceOccurrence"> | Date | string | null;
    completedById?: Prisma.IntNullableWithAggregatesFilter<"MaintenanceOccurrence"> | number | null;
    workPerformed?: Prisma.StringNullableWithAggregatesFilter<"MaintenanceOccurrence"> | string | null;
    remarks?: Prisma.StringNullableWithAggregatesFilter<"MaintenanceOccurrence"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"MaintenanceOccurrence"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"MaintenanceOccurrence"> | Date | string;
};
export type MaintenanceOccurrenceCreateInput = {
    dueDate: Date | string;
    status?: $Enums.MaintenanceOccurrenceStatus;
    completedAt?: Date | string | null;
    workPerformed?: string | null;
    remarks?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    maintenancePlan: Prisma.MaintenancePlanCreateNestedOneWithoutOccurrencesInput;
    completedBy?: Prisma.UserCreateNestedOneWithoutCompletedOccurrencesInput;
    linkedWorkOrder?: Prisma.WorkOrderCreateNestedManyWithoutMaintenanceOccurrenceInput;
    notifications?: Prisma.NotificationCreateNestedManyWithoutOccurrenceInput;
};
export type MaintenanceOccurrenceUncheckedCreateInput = {
    id?: number;
    maintenancePlanId: number;
    dueDate: Date | string;
    status?: $Enums.MaintenanceOccurrenceStatus;
    completedAt?: Date | string | null;
    completedById?: number | null;
    workPerformed?: string | null;
    remarks?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    linkedWorkOrder?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutMaintenanceOccurrenceInput;
    notifications?: Prisma.NotificationUncheckedCreateNestedManyWithoutOccurrenceInput;
};
export type MaintenanceOccurrenceUpdateInput = {
    dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumMaintenanceOccurrenceStatusFieldUpdateOperationsInput | $Enums.MaintenanceOccurrenceStatus;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    workPerformed?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    remarks?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    maintenancePlan?: Prisma.MaintenancePlanUpdateOneRequiredWithoutOccurrencesNestedInput;
    completedBy?: Prisma.UserUpdateOneWithoutCompletedOccurrencesNestedInput;
    linkedWorkOrder?: Prisma.WorkOrderUpdateManyWithoutMaintenanceOccurrenceNestedInput;
    notifications?: Prisma.NotificationUpdateManyWithoutOccurrenceNestedInput;
};
export type MaintenanceOccurrenceUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    maintenancePlanId?: Prisma.IntFieldUpdateOperationsInput | number;
    dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumMaintenanceOccurrenceStatusFieldUpdateOperationsInput | $Enums.MaintenanceOccurrenceStatus;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedById?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    workPerformed?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    remarks?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    linkedWorkOrder?: Prisma.WorkOrderUncheckedUpdateManyWithoutMaintenanceOccurrenceNestedInput;
    notifications?: Prisma.NotificationUncheckedUpdateManyWithoutOccurrenceNestedInput;
};
export type MaintenanceOccurrenceCreateManyInput = {
    id?: number;
    maintenancePlanId: number;
    dueDate: Date | string;
    status?: $Enums.MaintenanceOccurrenceStatus;
    completedAt?: Date | string | null;
    completedById?: number | null;
    workPerformed?: string | null;
    remarks?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type MaintenanceOccurrenceUpdateManyMutationInput = {
    dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumMaintenanceOccurrenceStatusFieldUpdateOperationsInput | $Enums.MaintenanceOccurrenceStatus;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    workPerformed?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    remarks?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MaintenanceOccurrenceUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    maintenancePlanId?: Prisma.IntFieldUpdateOperationsInput | number;
    dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumMaintenanceOccurrenceStatusFieldUpdateOperationsInput | $Enums.MaintenanceOccurrenceStatus;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedById?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    workPerformed?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    remarks?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MaintenanceOccurrenceListRelationFilter = {
    every?: Prisma.MaintenanceOccurrenceWhereInput;
    some?: Prisma.MaintenanceOccurrenceWhereInput;
    none?: Prisma.MaintenanceOccurrenceWhereInput;
};
export type MaintenanceOccurrenceOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type MaintenanceOccurrenceNullableScalarRelationFilter = {
    is?: Prisma.MaintenanceOccurrenceWhereInput | null;
    isNot?: Prisma.MaintenanceOccurrenceWhereInput | null;
};
export type MaintenanceOccurrenceMaintenancePlanIdDueDateCompoundUniqueInput = {
    maintenancePlanId: number;
    dueDate: Date | string;
};
export type MaintenanceOccurrenceCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    maintenancePlanId?: Prisma.SortOrder;
    dueDate?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    completedAt?: Prisma.SortOrder;
    completedById?: Prisma.SortOrder;
    workPerformed?: Prisma.SortOrder;
    remarks?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type MaintenanceOccurrenceAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    maintenancePlanId?: Prisma.SortOrder;
    completedById?: Prisma.SortOrder;
};
export type MaintenanceOccurrenceMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    maintenancePlanId?: Prisma.SortOrder;
    dueDate?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    completedAt?: Prisma.SortOrder;
    completedById?: Prisma.SortOrder;
    workPerformed?: Prisma.SortOrder;
    remarks?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type MaintenanceOccurrenceMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    maintenancePlanId?: Prisma.SortOrder;
    dueDate?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    completedAt?: Prisma.SortOrder;
    completedById?: Prisma.SortOrder;
    workPerformed?: Prisma.SortOrder;
    remarks?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type MaintenanceOccurrenceSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    maintenancePlanId?: Prisma.SortOrder;
    completedById?: Prisma.SortOrder;
};
export type MaintenanceOccurrenceCreateNestedManyWithoutCompletedByInput = {
    create?: Prisma.XOR<Prisma.MaintenanceOccurrenceCreateWithoutCompletedByInput, Prisma.MaintenanceOccurrenceUncheckedCreateWithoutCompletedByInput> | Prisma.MaintenanceOccurrenceCreateWithoutCompletedByInput[] | Prisma.MaintenanceOccurrenceUncheckedCreateWithoutCompletedByInput[];
    connectOrCreate?: Prisma.MaintenanceOccurrenceCreateOrConnectWithoutCompletedByInput | Prisma.MaintenanceOccurrenceCreateOrConnectWithoutCompletedByInput[];
    createMany?: Prisma.MaintenanceOccurrenceCreateManyCompletedByInputEnvelope;
    connect?: Prisma.MaintenanceOccurrenceWhereUniqueInput | Prisma.MaintenanceOccurrenceWhereUniqueInput[];
};
export type MaintenanceOccurrenceUncheckedCreateNestedManyWithoutCompletedByInput = {
    create?: Prisma.XOR<Prisma.MaintenanceOccurrenceCreateWithoutCompletedByInput, Prisma.MaintenanceOccurrenceUncheckedCreateWithoutCompletedByInput> | Prisma.MaintenanceOccurrenceCreateWithoutCompletedByInput[] | Prisma.MaintenanceOccurrenceUncheckedCreateWithoutCompletedByInput[];
    connectOrCreate?: Prisma.MaintenanceOccurrenceCreateOrConnectWithoutCompletedByInput | Prisma.MaintenanceOccurrenceCreateOrConnectWithoutCompletedByInput[];
    createMany?: Prisma.MaintenanceOccurrenceCreateManyCompletedByInputEnvelope;
    connect?: Prisma.MaintenanceOccurrenceWhereUniqueInput | Prisma.MaintenanceOccurrenceWhereUniqueInput[];
};
export type MaintenanceOccurrenceUpdateManyWithoutCompletedByNestedInput = {
    create?: Prisma.XOR<Prisma.MaintenanceOccurrenceCreateWithoutCompletedByInput, Prisma.MaintenanceOccurrenceUncheckedCreateWithoutCompletedByInput> | Prisma.MaintenanceOccurrenceCreateWithoutCompletedByInput[] | Prisma.MaintenanceOccurrenceUncheckedCreateWithoutCompletedByInput[];
    connectOrCreate?: Prisma.MaintenanceOccurrenceCreateOrConnectWithoutCompletedByInput | Prisma.MaintenanceOccurrenceCreateOrConnectWithoutCompletedByInput[];
    upsert?: Prisma.MaintenanceOccurrenceUpsertWithWhereUniqueWithoutCompletedByInput | Prisma.MaintenanceOccurrenceUpsertWithWhereUniqueWithoutCompletedByInput[];
    createMany?: Prisma.MaintenanceOccurrenceCreateManyCompletedByInputEnvelope;
    set?: Prisma.MaintenanceOccurrenceWhereUniqueInput | Prisma.MaintenanceOccurrenceWhereUniqueInput[];
    disconnect?: Prisma.MaintenanceOccurrenceWhereUniqueInput | Prisma.MaintenanceOccurrenceWhereUniqueInput[];
    delete?: Prisma.MaintenanceOccurrenceWhereUniqueInput | Prisma.MaintenanceOccurrenceWhereUniqueInput[];
    connect?: Prisma.MaintenanceOccurrenceWhereUniqueInput | Prisma.MaintenanceOccurrenceWhereUniqueInput[];
    update?: Prisma.MaintenanceOccurrenceUpdateWithWhereUniqueWithoutCompletedByInput | Prisma.MaintenanceOccurrenceUpdateWithWhereUniqueWithoutCompletedByInput[];
    updateMany?: Prisma.MaintenanceOccurrenceUpdateManyWithWhereWithoutCompletedByInput | Prisma.MaintenanceOccurrenceUpdateManyWithWhereWithoutCompletedByInput[];
    deleteMany?: Prisma.MaintenanceOccurrenceScalarWhereInput | Prisma.MaintenanceOccurrenceScalarWhereInput[];
};
export type MaintenanceOccurrenceUncheckedUpdateManyWithoutCompletedByNestedInput = {
    create?: Prisma.XOR<Prisma.MaintenanceOccurrenceCreateWithoutCompletedByInput, Prisma.MaintenanceOccurrenceUncheckedCreateWithoutCompletedByInput> | Prisma.MaintenanceOccurrenceCreateWithoutCompletedByInput[] | Prisma.MaintenanceOccurrenceUncheckedCreateWithoutCompletedByInput[];
    connectOrCreate?: Prisma.MaintenanceOccurrenceCreateOrConnectWithoutCompletedByInput | Prisma.MaintenanceOccurrenceCreateOrConnectWithoutCompletedByInput[];
    upsert?: Prisma.MaintenanceOccurrenceUpsertWithWhereUniqueWithoutCompletedByInput | Prisma.MaintenanceOccurrenceUpsertWithWhereUniqueWithoutCompletedByInput[];
    createMany?: Prisma.MaintenanceOccurrenceCreateManyCompletedByInputEnvelope;
    set?: Prisma.MaintenanceOccurrenceWhereUniqueInput | Prisma.MaintenanceOccurrenceWhereUniqueInput[];
    disconnect?: Prisma.MaintenanceOccurrenceWhereUniqueInput | Prisma.MaintenanceOccurrenceWhereUniqueInput[];
    delete?: Prisma.MaintenanceOccurrenceWhereUniqueInput | Prisma.MaintenanceOccurrenceWhereUniqueInput[];
    connect?: Prisma.MaintenanceOccurrenceWhereUniqueInput | Prisma.MaintenanceOccurrenceWhereUniqueInput[];
    update?: Prisma.MaintenanceOccurrenceUpdateWithWhereUniqueWithoutCompletedByInput | Prisma.MaintenanceOccurrenceUpdateWithWhereUniqueWithoutCompletedByInput[];
    updateMany?: Prisma.MaintenanceOccurrenceUpdateManyWithWhereWithoutCompletedByInput | Prisma.MaintenanceOccurrenceUpdateManyWithWhereWithoutCompletedByInput[];
    deleteMany?: Prisma.MaintenanceOccurrenceScalarWhereInput | Prisma.MaintenanceOccurrenceScalarWhereInput[];
};
export type MaintenanceOccurrenceCreateNestedOneWithoutLinkedWorkOrderInput = {
    create?: Prisma.XOR<Prisma.MaintenanceOccurrenceCreateWithoutLinkedWorkOrderInput, Prisma.MaintenanceOccurrenceUncheckedCreateWithoutLinkedWorkOrderInput>;
    connectOrCreate?: Prisma.MaintenanceOccurrenceCreateOrConnectWithoutLinkedWorkOrderInput;
    connect?: Prisma.MaintenanceOccurrenceWhereUniqueInput;
};
export type MaintenanceOccurrenceUpdateOneWithoutLinkedWorkOrderNestedInput = {
    create?: Prisma.XOR<Prisma.MaintenanceOccurrenceCreateWithoutLinkedWorkOrderInput, Prisma.MaintenanceOccurrenceUncheckedCreateWithoutLinkedWorkOrderInput>;
    connectOrCreate?: Prisma.MaintenanceOccurrenceCreateOrConnectWithoutLinkedWorkOrderInput;
    upsert?: Prisma.MaintenanceOccurrenceUpsertWithoutLinkedWorkOrderInput;
    disconnect?: Prisma.MaintenanceOccurrenceWhereInput | boolean;
    delete?: Prisma.MaintenanceOccurrenceWhereInput | boolean;
    connect?: Prisma.MaintenanceOccurrenceWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.MaintenanceOccurrenceUpdateToOneWithWhereWithoutLinkedWorkOrderInput, Prisma.MaintenanceOccurrenceUpdateWithoutLinkedWorkOrderInput>, Prisma.MaintenanceOccurrenceUncheckedUpdateWithoutLinkedWorkOrderInput>;
};
export type MaintenanceOccurrenceCreateNestedManyWithoutMaintenancePlanInput = {
    create?: Prisma.XOR<Prisma.MaintenanceOccurrenceCreateWithoutMaintenancePlanInput, Prisma.MaintenanceOccurrenceUncheckedCreateWithoutMaintenancePlanInput> | Prisma.MaintenanceOccurrenceCreateWithoutMaintenancePlanInput[] | Prisma.MaintenanceOccurrenceUncheckedCreateWithoutMaintenancePlanInput[];
    connectOrCreate?: Prisma.MaintenanceOccurrenceCreateOrConnectWithoutMaintenancePlanInput | Prisma.MaintenanceOccurrenceCreateOrConnectWithoutMaintenancePlanInput[];
    createMany?: Prisma.MaintenanceOccurrenceCreateManyMaintenancePlanInputEnvelope;
    connect?: Prisma.MaintenanceOccurrenceWhereUniqueInput | Prisma.MaintenanceOccurrenceWhereUniqueInput[];
};
export type MaintenanceOccurrenceUncheckedCreateNestedManyWithoutMaintenancePlanInput = {
    create?: Prisma.XOR<Prisma.MaintenanceOccurrenceCreateWithoutMaintenancePlanInput, Prisma.MaintenanceOccurrenceUncheckedCreateWithoutMaintenancePlanInput> | Prisma.MaintenanceOccurrenceCreateWithoutMaintenancePlanInput[] | Prisma.MaintenanceOccurrenceUncheckedCreateWithoutMaintenancePlanInput[];
    connectOrCreate?: Prisma.MaintenanceOccurrenceCreateOrConnectWithoutMaintenancePlanInput | Prisma.MaintenanceOccurrenceCreateOrConnectWithoutMaintenancePlanInput[];
    createMany?: Prisma.MaintenanceOccurrenceCreateManyMaintenancePlanInputEnvelope;
    connect?: Prisma.MaintenanceOccurrenceWhereUniqueInput | Prisma.MaintenanceOccurrenceWhereUniqueInput[];
};
export type MaintenanceOccurrenceUpdateManyWithoutMaintenancePlanNestedInput = {
    create?: Prisma.XOR<Prisma.MaintenanceOccurrenceCreateWithoutMaintenancePlanInput, Prisma.MaintenanceOccurrenceUncheckedCreateWithoutMaintenancePlanInput> | Prisma.MaintenanceOccurrenceCreateWithoutMaintenancePlanInput[] | Prisma.MaintenanceOccurrenceUncheckedCreateWithoutMaintenancePlanInput[];
    connectOrCreate?: Prisma.MaintenanceOccurrenceCreateOrConnectWithoutMaintenancePlanInput | Prisma.MaintenanceOccurrenceCreateOrConnectWithoutMaintenancePlanInput[];
    upsert?: Prisma.MaintenanceOccurrenceUpsertWithWhereUniqueWithoutMaintenancePlanInput | Prisma.MaintenanceOccurrenceUpsertWithWhereUniqueWithoutMaintenancePlanInput[];
    createMany?: Prisma.MaintenanceOccurrenceCreateManyMaintenancePlanInputEnvelope;
    set?: Prisma.MaintenanceOccurrenceWhereUniqueInput | Prisma.MaintenanceOccurrenceWhereUniqueInput[];
    disconnect?: Prisma.MaintenanceOccurrenceWhereUniqueInput | Prisma.MaintenanceOccurrenceWhereUniqueInput[];
    delete?: Prisma.MaintenanceOccurrenceWhereUniqueInput | Prisma.MaintenanceOccurrenceWhereUniqueInput[];
    connect?: Prisma.MaintenanceOccurrenceWhereUniqueInput | Prisma.MaintenanceOccurrenceWhereUniqueInput[];
    update?: Prisma.MaintenanceOccurrenceUpdateWithWhereUniqueWithoutMaintenancePlanInput | Prisma.MaintenanceOccurrenceUpdateWithWhereUniqueWithoutMaintenancePlanInput[];
    updateMany?: Prisma.MaintenanceOccurrenceUpdateManyWithWhereWithoutMaintenancePlanInput | Prisma.MaintenanceOccurrenceUpdateManyWithWhereWithoutMaintenancePlanInput[];
    deleteMany?: Prisma.MaintenanceOccurrenceScalarWhereInput | Prisma.MaintenanceOccurrenceScalarWhereInput[];
};
export type MaintenanceOccurrenceUncheckedUpdateManyWithoutMaintenancePlanNestedInput = {
    create?: Prisma.XOR<Prisma.MaintenanceOccurrenceCreateWithoutMaintenancePlanInput, Prisma.MaintenanceOccurrenceUncheckedCreateWithoutMaintenancePlanInput> | Prisma.MaintenanceOccurrenceCreateWithoutMaintenancePlanInput[] | Prisma.MaintenanceOccurrenceUncheckedCreateWithoutMaintenancePlanInput[];
    connectOrCreate?: Prisma.MaintenanceOccurrenceCreateOrConnectWithoutMaintenancePlanInput | Prisma.MaintenanceOccurrenceCreateOrConnectWithoutMaintenancePlanInput[];
    upsert?: Prisma.MaintenanceOccurrenceUpsertWithWhereUniqueWithoutMaintenancePlanInput | Prisma.MaintenanceOccurrenceUpsertWithWhereUniqueWithoutMaintenancePlanInput[];
    createMany?: Prisma.MaintenanceOccurrenceCreateManyMaintenancePlanInputEnvelope;
    set?: Prisma.MaintenanceOccurrenceWhereUniqueInput | Prisma.MaintenanceOccurrenceWhereUniqueInput[];
    disconnect?: Prisma.MaintenanceOccurrenceWhereUniqueInput | Prisma.MaintenanceOccurrenceWhereUniqueInput[];
    delete?: Prisma.MaintenanceOccurrenceWhereUniqueInput | Prisma.MaintenanceOccurrenceWhereUniqueInput[];
    connect?: Prisma.MaintenanceOccurrenceWhereUniqueInput | Prisma.MaintenanceOccurrenceWhereUniqueInput[];
    update?: Prisma.MaintenanceOccurrenceUpdateWithWhereUniqueWithoutMaintenancePlanInput | Prisma.MaintenanceOccurrenceUpdateWithWhereUniqueWithoutMaintenancePlanInput[];
    updateMany?: Prisma.MaintenanceOccurrenceUpdateManyWithWhereWithoutMaintenancePlanInput | Prisma.MaintenanceOccurrenceUpdateManyWithWhereWithoutMaintenancePlanInput[];
    deleteMany?: Prisma.MaintenanceOccurrenceScalarWhereInput | Prisma.MaintenanceOccurrenceScalarWhereInput[];
};
export type EnumMaintenanceOccurrenceStatusFieldUpdateOperationsInput = {
    set?: $Enums.MaintenanceOccurrenceStatus;
};
export type MaintenanceOccurrenceCreateNestedOneWithoutNotificationsInput = {
    create?: Prisma.XOR<Prisma.MaintenanceOccurrenceCreateWithoutNotificationsInput, Prisma.MaintenanceOccurrenceUncheckedCreateWithoutNotificationsInput>;
    connectOrCreate?: Prisma.MaintenanceOccurrenceCreateOrConnectWithoutNotificationsInput;
    connect?: Prisma.MaintenanceOccurrenceWhereUniqueInput;
};
export type MaintenanceOccurrenceUpdateOneWithoutNotificationsNestedInput = {
    create?: Prisma.XOR<Prisma.MaintenanceOccurrenceCreateWithoutNotificationsInput, Prisma.MaintenanceOccurrenceUncheckedCreateWithoutNotificationsInput>;
    connectOrCreate?: Prisma.MaintenanceOccurrenceCreateOrConnectWithoutNotificationsInput;
    upsert?: Prisma.MaintenanceOccurrenceUpsertWithoutNotificationsInput;
    disconnect?: Prisma.MaintenanceOccurrenceWhereInput | boolean;
    delete?: Prisma.MaintenanceOccurrenceWhereInput | boolean;
    connect?: Prisma.MaintenanceOccurrenceWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.MaintenanceOccurrenceUpdateToOneWithWhereWithoutNotificationsInput, Prisma.MaintenanceOccurrenceUpdateWithoutNotificationsInput>, Prisma.MaintenanceOccurrenceUncheckedUpdateWithoutNotificationsInput>;
};
export type MaintenanceOccurrenceCreateWithoutCompletedByInput = {
    dueDate: Date | string;
    status?: $Enums.MaintenanceOccurrenceStatus;
    completedAt?: Date | string | null;
    workPerformed?: string | null;
    remarks?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    maintenancePlan: Prisma.MaintenancePlanCreateNestedOneWithoutOccurrencesInput;
    linkedWorkOrder?: Prisma.WorkOrderCreateNestedManyWithoutMaintenanceOccurrenceInput;
    notifications?: Prisma.NotificationCreateNestedManyWithoutOccurrenceInput;
};
export type MaintenanceOccurrenceUncheckedCreateWithoutCompletedByInput = {
    id?: number;
    maintenancePlanId: number;
    dueDate: Date | string;
    status?: $Enums.MaintenanceOccurrenceStatus;
    completedAt?: Date | string | null;
    workPerformed?: string | null;
    remarks?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    linkedWorkOrder?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutMaintenanceOccurrenceInput;
    notifications?: Prisma.NotificationUncheckedCreateNestedManyWithoutOccurrenceInput;
};
export type MaintenanceOccurrenceCreateOrConnectWithoutCompletedByInput = {
    where: Prisma.MaintenanceOccurrenceWhereUniqueInput;
    create: Prisma.XOR<Prisma.MaintenanceOccurrenceCreateWithoutCompletedByInput, Prisma.MaintenanceOccurrenceUncheckedCreateWithoutCompletedByInput>;
};
export type MaintenanceOccurrenceCreateManyCompletedByInputEnvelope = {
    data: Prisma.MaintenanceOccurrenceCreateManyCompletedByInput | Prisma.MaintenanceOccurrenceCreateManyCompletedByInput[];
    skipDuplicates?: boolean;
};
export type MaintenanceOccurrenceUpsertWithWhereUniqueWithoutCompletedByInput = {
    where: Prisma.MaintenanceOccurrenceWhereUniqueInput;
    update: Prisma.XOR<Prisma.MaintenanceOccurrenceUpdateWithoutCompletedByInput, Prisma.MaintenanceOccurrenceUncheckedUpdateWithoutCompletedByInput>;
    create: Prisma.XOR<Prisma.MaintenanceOccurrenceCreateWithoutCompletedByInput, Prisma.MaintenanceOccurrenceUncheckedCreateWithoutCompletedByInput>;
};
export type MaintenanceOccurrenceUpdateWithWhereUniqueWithoutCompletedByInput = {
    where: Prisma.MaintenanceOccurrenceWhereUniqueInput;
    data: Prisma.XOR<Prisma.MaintenanceOccurrenceUpdateWithoutCompletedByInput, Prisma.MaintenanceOccurrenceUncheckedUpdateWithoutCompletedByInput>;
};
export type MaintenanceOccurrenceUpdateManyWithWhereWithoutCompletedByInput = {
    where: Prisma.MaintenanceOccurrenceScalarWhereInput;
    data: Prisma.XOR<Prisma.MaintenanceOccurrenceUpdateManyMutationInput, Prisma.MaintenanceOccurrenceUncheckedUpdateManyWithoutCompletedByInput>;
};
export type MaintenanceOccurrenceScalarWhereInput = {
    AND?: Prisma.MaintenanceOccurrenceScalarWhereInput | Prisma.MaintenanceOccurrenceScalarWhereInput[];
    OR?: Prisma.MaintenanceOccurrenceScalarWhereInput[];
    NOT?: Prisma.MaintenanceOccurrenceScalarWhereInput | Prisma.MaintenanceOccurrenceScalarWhereInput[];
    id?: Prisma.IntFilter<"MaintenanceOccurrence"> | number;
    maintenancePlanId?: Prisma.IntFilter<"MaintenanceOccurrence"> | number;
    dueDate?: Prisma.DateTimeFilter<"MaintenanceOccurrence"> | Date | string;
    status?: Prisma.EnumMaintenanceOccurrenceStatusFilter<"MaintenanceOccurrence"> | $Enums.MaintenanceOccurrenceStatus;
    completedAt?: Prisma.DateTimeNullableFilter<"MaintenanceOccurrence"> | Date | string | null;
    completedById?: Prisma.IntNullableFilter<"MaintenanceOccurrence"> | number | null;
    workPerformed?: Prisma.StringNullableFilter<"MaintenanceOccurrence"> | string | null;
    remarks?: Prisma.StringNullableFilter<"MaintenanceOccurrence"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"MaintenanceOccurrence"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"MaintenanceOccurrence"> | Date | string;
};
export type MaintenanceOccurrenceCreateWithoutLinkedWorkOrderInput = {
    dueDate: Date | string;
    status?: $Enums.MaintenanceOccurrenceStatus;
    completedAt?: Date | string | null;
    workPerformed?: string | null;
    remarks?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    maintenancePlan: Prisma.MaintenancePlanCreateNestedOneWithoutOccurrencesInput;
    completedBy?: Prisma.UserCreateNestedOneWithoutCompletedOccurrencesInput;
    notifications?: Prisma.NotificationCreateNestedManyWithoutOccurrenceInput;
};
export type MaintenanceOccurrenceUncheckedCreateWithoutLinkedWorkOrderInput = {
    id?: number;
    maintenancePlanId: number;
    dueDate: Date | string;
    status?: $Enums.MaintenanceOccurrenceStatus;
    completedAt?: Date | string | null;
    completedById?: number | null;
    workPerformed?: string | null;
    remarks?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    notifications?: Prisma.NotificationUncheckedCreateNestedManyWithoutOccurrenceInput;
};
export type MaintenanceOccurrenceCreateOrConnectWithoutLinkedWorkOrderInput = {
    where: Prisma.MaintenanceOccurrenceWhereUniqueInput;
    create: Prisma.XOR<Prisma.MaintenanceOccurrenceCreateWithoutLinkedWorkOrderInput, Prisma.MaintenanceOccurrenceUncheckedCreateWithoutLinkedWorkOrderInput>;
};
export type MaintenanceOccurrenceUpsertWithoutLinkedWorkOrderInput = {
    update: Prisma.XOR<Prisma.MaintenanceOccurrenceUpdateWithoutLinkedWorkOrderInput, Prisma.MaintenanceOccurrenceUncheckedUpdateWithoutLinkedWorkOrderInput>;
    create: Prisma.XOR<Prisma.MaintenanceOccurrenceCreateWithoutLinkedWorkOrderInput, Prisma.MaintenanceOccurrenceUncheckedCreateWithoutLinkedWorkOrderInput>;
    where?: Prisma.MaintenanceOccurrenceWhereInput;
};
export type MaintenanceOccurrenceUpdateToOneWithWhereWithoutLinkedWorkOrderInput = {
    where?: Prisma.MaintenanceOccurrenceWhereInput;
    data: Prisma.XOR<Prisma.MaintenanceOccurrenceUpdateWithoutLinkedWorkOrderInput, Prisma.MaintenanceOccurrenceUncheckedUpdateWithoutLinkedWorkOrderInput>;
};
export type MaintenanceOccurrenceUpdateWithoutLinkedWorkOrderInput = {
    dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumMaintenanceOccurrenceStatusFieldUpdateOperationsInput | $Enums.MaintenanceOccurrenceStatus;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    workPerformed?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    remarks?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    maintenancePlan?: Prisma.MaintenancePlanUpdateOneRequiredWithoutOccurrencesNestedInput;
    completedBy?: Prisma.UserUpdateOneWithoutCompletedOccurrencesNestedInput;
    notifications?: Prisma.NotificationUpdateManyWithoutOccurrenceNestedInput;
};
export type MaintenanceOccurrenceUncheckedUpdateWithoutLinkedWorkOrderInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    maintenancePlanId?: Prisma.IntFieldUpdateOperationsInput | number;
    dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumMaintenanceOccurrenceStatusFieldUpdateOperationsInput | $Enums.MaintenanceOccurrenceStatus;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedById?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    workPerformed?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    remarks?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    notifications?: Prisma.NotificationUncheckedUpdateManyWithoutOccurrenceNestedInput;
};
export type MaintenanceOccurrenceCreateWithoutMaintenancePlanInput = {
    dueDate: Date | string;
    status?: $Enums.MaintenanceOccurrenceStatus;
    completedAt?: Date | string | null;
    workPerformed?: string | null;
    remarks?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    completedBy?: Prisma.UserCreateNestedOneWithoutCompletedOccurrencesInput;
    linkedWorkOrder?: Prisma.WorkOrderCreateNestedManyWithoutMaintenanceOccurrenceInput;
    notifications?: Prisma.NotificationCreateNestedManyWithoutOccurrenceInput;
};
export type MaintenanceOccurrenceUncheckedCreateWithoutMaintenancePlanInput = {
    id?: number;
    dueDate: Date | string;
    status?: $Enums.MaintenanceOccurrenceStatus;
    completedAt?: Date | string | null;
    completedById?: number | null;
    workPerformed?: string | null;
    remarks?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    linkedWorkOrder?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutMaintenanceOccurrenceInput;
    notifications?: Prisma.NotificationUncheckedCreateNestedManyWithoutOccurrenceInput;
};
export type MaintenanceOccurrenceCreateOrConnectWithoutMaintenancePlanInput = {
    where: Prisma.MaintenanceOccurrenceWhereUniqueInput;
    create: Prisma.XOR<Prisma.MaintenanceOccurrenceCreateWithoutMaintenancePlanInput, Prisma.MaintenanceOccurrenceUncheckedCreateWithoutMaintenancePlanInput>;
};
export type MaintenanceOccurrenceCreateManyMaintenancePlanInputEnvelope = {
    data: Prisma.MaintenanceOccurrenceCreateManyMaintenancePlanInput | Prisma.MaintenanceOccurrenceCreateManyMaintenancePlanInput[];
    skipDuplicates?: boolean;
};
export type MaintenanceOccurrenceUpsertWithWhereUniqueWithoutMaintenancePlanInput = {
    where: Prisma.MaintenanceOccurrenceWhereUniqueInput;
    update: Prisma.XOR<Prisma.MaintenanceOccurrenceUpdateWithoutMaintenancePlanInput, Prisma.MaintenanceOccurrenceUncheckedUpdateWithoutMaintenancePlanInput>;
    create: Prisma.XOR<Prisma.MaintenanceOccurrenceCreateWithoutMaintenancePlanInput, Prisma.MaintenanceOccurrenceUncheckedCreateWithoutMaintenancePlanInput>;
};
export type MaintenanceOccurrenceUpdateWithWhereUniqueWithoutMaintenancePlanInput = {
    where: Prisma.MaintenanceOccurrenceWhereUniqueInput;
    data: Prisma.XOR<Prisma.MaintenanceOccurrenceUpdateWithoutMaintenancePlanInput, Prisma.MaintenanceOccurrenceUncheckedUpdateWithoutMaintenancePlanInput>;
};
export type MaintenanceOccurrenceUpdateManyWithWhereWithoutMaintenancePlanInput = {
    where: Prisma.MaintenanceOccurrenceScalarWhereInput;
    data: Prisma.XOR<Prisma.MaintenanceOccurrenceUpdateManyMutationInput, Prisma.MaintenanceOccurrenceUncheckedUpdateManyWithoutMaintenancePlanInput>;
};
export type MaintenanceOccurrenceCreateWithoutNotificationsInput = {
    dueDate: Date | string;
    status?: $Enums.MaintenanceOccurrenceStatus;
    completedAt?: Date | string | null;
    workPerformed?: string | null;
    remarks?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    maintenancePlan: Prisma.MaintenancePlanCreateNestedOneWithoutOccurrencesInput;
    completedBy?: Prisma.UserCreateNestedOneWithoutCompletedOccurrencesInput;
    linkedWorkOrder?: Prisma.WorkOrderCreateNestedManyWithoutMaintenanceOccurrenceInput;
};
export type MaintenanceOccurrenceUncheckedCreateWithoutNotificationsInput = {
    id?: number;
    maintenancePlanId: number;
    dueDate: Date | string;
    status?: $Enums.MaintenanceOccurrenceStatus;
    completedAt?: Date | string | null;
    completedById?: number | null;
    workPerformed?: string | null;
    remarks?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    linkedWorkOrder?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutMaintenanceOccurrenceInput;
};
export type MaintenanceOccurrenceCreateOrConnectWithoutNotificationsInput = {
    where: Prisma.MaintenanceOccurrenceWhereUniqueInput;
    create: Prisma.XOR<Prisma.MaintenanceOccurrenceCreateWithoutNotificationsInput, Prisma.MaintenanceOccurrenceUncheckedCreateWithoutNotificationsInput>;
};
export type MaintenanceOccurrenceUpsertWithoutNotificationsInput = {
    update: Prisma.XOR<Prisma.MaintenanceOccurrenceUpdateWithoutNotificationsInput, Prisma.MaintenanceOccurrenceUncheckedUpdateWithoutNotificationsInput>;
    create: Prisma.XOR<Prisma.MaintenanceOccurrenceCreateWithoutNotificationsInput, Prisma.MaintenanceOccurrenceUncheckedCreateWithoutNotificationsInput>;
    where?: Prisma.MaintenanceOccurrenceWhereInput;
};
export type MaintenanceOccurrenceUpdateToOneWithWhereWithoutNotificationsInput = {
    where?: Prisma.MaintenanceOccurrenceWhereInput;
    data: Prisma.XOR<Prisma.MaintenanceOccurrenceUpdateWithoutNotificationsInput, Prisma.MaintenanceOccurrenceUncheckedUpdateWithoutNotificationsInput>;
};
export type MaintenanceOccurrenceUpdateWithoutNotificationsInput = {
    dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumMaintenanceOccurrenceStatusFieldUpdateOperationsInput | $Enums.MaintenanceOccurrenceStatus;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    workPerformed?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    remarks?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    maintenancePlan?: Prisma.MaintenancePlanUpdateOneRequiredWithoutOccurrencesNestedInput;
    completedBy?: Prisma.UserUpdateOneWithoutCompletedOccurrencesNestedInput;
    linkedWorkOrder?: Prisma.WorkOrderUpdateManyWithoutMaintenanceOccurrenceNestedInput;
};
export type MaintenanceOccurrenceUncheckedUpdateWithoutNotificationsInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    maintenancePlanId?: Prisma.IntFieldUpdateOperationsInput | number;
    dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumMaintenanceOccurrenceStatusFieldUpdateOperationsInput | $Enums.MaintenanceOccurrenceStatus;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedById?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    workPerformed?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    remarks?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    linkedWorkOrder?: Prisma.WorkOrderUncheckedUpdateManyWithoutMaintenanceOccurrenceNestedInput;
};
export type MaintenanceOccurrenceCreateManyCompletedByInput = {
    id?: number;
    maintenancePlanId: number;
    dueDate: Date | string;
    status?: $Enums.MaintenanceOccurrenceStatus;
    completedAt?: Date | string | null;
    workPerformed?: string | null;
    remarks?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type MaintenanceOccurrenceUpdateWithoutCompletedByInput = {
    dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumMaintenanceOccurrenceStatusFieldUpdateOperationsInput | $Enums.MaintenanceOccurrenceStatus;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    workPerformed?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    remarks?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    maintenancePlan?: Prisma.MaintenancePlanUpdateOneRequiredWithoutOccurrencesNestedInput;
    linkedWorkOrder?: Prisma.WorkOrderUpdateManyWithoutMaintenanceOccurrenceNestedInput;
    notifications?: Prisma.NotificationUpdateManyWithoutOccurrenceNestedInput;
};
export type MaintenanceOccurrenceUncheckedUpdateWithoutCompletedByInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    maintenancePlanId?: Prisma.IntFieldUpdateOperationsInput | number;
    dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumMaintenanceOccurrenceStatusFieldUpdateOperationsInput | $Enums.MaintenanceOccurrenceStatus;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    workPerformed?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    remarks?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    linkedWorkOrder?: Prisma.WorkOrderUncheckedUpdateManyWithoutMaintenanceOccurrenceNestedInput;
    notifications?: Prisma.NotificationUncheckedUpdateManyWithoutOccurrenceNestedInput;
};
export type MaintenanceOccurrenceUncheckedUpdateManyWithoutCompletedByInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    maintenancePlanId?: Prisma.IntFieldUpdateOperationsInput | number;
    dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumMaintenanceOccurrenceStatusFieldUpdateOperationsInput | $Enums.MaintenanceOccurrenceStatus;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    workPerformed?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    remarks?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MaintenanceOccurrenceCreateManyMaintenancePlanInput = {
    id?: number;
    dueDate: Date | string;
    status?: $Enums.MaintenanceOccurrenceStatus;
    completedAt?: Date | string | null;
    completedById?: number | null;
    workPerformed?: string | null;
    remarks?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type MaintenanceOccurrenceUpdateWithoutMaintenancePlanInput = {
    dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumMaintenanceOccurrenceStatusFieldUpdateOperationsInput | $Enums.MaintenanceOccurrenceStatus;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    workPerformed?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    remarks?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    completedBy?: Prisma.UserUpdateOneWithoutCompletedOccurrencesNestedInput;
    linkedWorkOrder?: Prisma.WorkOrderUpdateManyWithoutMaintenanceOccurrenceNestedInput;
    notifications?: Prisma.NotificationUpdateManyWithoutOccurrenceNestedInput;
};
export type MaintenanceOccurrenceUncheckedUpdateWithoutMaintenancePlanInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumMaintenanceOccurrenceStatusFieldUpdateOperationsInput | $Enums.MaintenanceOccurrenceStatus;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedById?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    workPerformed?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    remarks?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    linkedWorkOrder?: Prisma.WorkOrderUncheckedUpdateManyWithoutMaintenanceOccurrenceNestedInput;
    notifications?: Prisma.NotificationUncheckedUpdateManyWithoutOccurrenceNestedInput;
};
export type MaintenanceOccurrenceUncheckedUpdateManyWithoutMaintenancePlanInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumMaintenanceOccurrenceStatusFieldUpdateOperationsInput | $Enums.MaintenanceOccurrenceStatus;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedById?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    workPerformed?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    remarks?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
/**
 * Count Type MaintenanceOccurrenceCountOutputType
 */
export type MaintenanceOccurrenceCountOutputType = {
    linkedWorkOrder: number;
    notifications: number;
};
export type MaintenanceOccurrenceCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    linkedWorkOrder?: boolean | MaintenanceOccurrenceCountOutputTypeCountLinkedWorkOrderArgs;
    notifications?: boolean | MaintenanceOccurrenceCountOutputTypeCountNotificationsArgs;
};
/**
 * MaintenanceOccurrenceCountOutputType without action
 */
export type MaintenanceOccurrenceCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaintenanceOccurrenceCountOutputType
     */
    select?: Prisma.MaintenanceOccurrenceCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * MaintenanceOccurrenceCountOutputType without action
 */
export type MaintenanceOccurrenceCountOutputTypeCountLinkedWorkOrderArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.WorkOrderWhereInput;
};
/**
 * MaintenanceOccurrenceCountOutputType without action
 */
export type MaintenanceOccurrenceCountOutputTypeCountNotificationsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.NotificationWhereInput;
};
export type MaintenanceOccurrenceSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    maintenancePlanId?: boolean;
    dueDate?: boolean;
    status?: boolean;
    completedAt?: boolean;
    completedById?: boolean;
    workPerformed?: boolean;
    remarks?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    maintenancePlan?: boolean | Prisma.MaintenancePlanDefaultArgs<ExtArgs>;
    completedBy?: boolean | Prisma.MaintenanceOccurrence$completedByArgs<ExtArgs>;
    linkedWorkOrder?: boolean | Prisma.MaintenanceOccurrence$linkedWorkOrderArgs<ExtArgs>;
    notifications?: boolean | Prisma.MaintenanceOccurrence$notificationsArgs<ExtArgs>;
    _count?: boolean | Prisma.MaintenanceOccurrenceCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["maintenanceOccurrence"]>;
export type MaintenanceOccurrenceSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    maintenancePlanId?: boolean;
    dueDate?: boolean;
    status?: boolean;
    completedAt?: boolean;
    completedById?: boolean;
    workPerformed?: boolean;
    remarks?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    maintenancePlan?: boolean | Prisma.MaintenancePlanDefaultArgs<ExtArgs>;
    completedBy?: boolean | Prisma.MaintenanceOccurrence$completedByArgs<ExtArgs>;
}, ExtArgs["result"]["maintenanceOccurrence"]>;
export type MaintenanceOccurrenceSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    maintenancePlanId?: boolean;
    dueDate?: boolean;
    status?: boolean;
    completedAt?: boolean;
    completedById?: boolean;
    workPerformed?: boolean;
    remarks?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    maintenancePlan?: boolean | Prisma.MaintenancePlanDefaultArgs<ExtArgs>;
    completedBy?: boolean | Prisma.MaintenanceOccurrence$completedByArgs<ExtArgs>;
}, ExtArgs["result"]["maintenanceOccurrence"]>;
export type MaintenanceOccurrenceSelectScalar = {
    id?: boolean;
    maintenancePlanId?: boolean;
    dueDate?: boolean;
    status?: boolean;
    completedAt?: boolean;
    completedById?: boolean;
    workPerformed?: boolean;
    remarks?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type MaintenanceOccurrenceOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "maintenancePlanId" | "dueDate" | "status" | "completedAt" | "completedById" | "workPerformed" | "remarks" | "createdAt" | "updatedAt", ExtArgs["result"]["maintenanceOccurrence"]>;
export type MaintenanceOccurrenceInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    maintenancePlan?: boolean | Prisma.MaintenancePlanDefaultArgs<ExtArgs>;
    completedBy?: boolean | Prisma.MaintenanceOccurrence$completedByArgs<ExtArgs>;
    linkedWorkOrder?: boolean | Prisma.MaintenanceOccurrence$linkedWorkOrderArgs<ExtArgs>;
    notifications?: boolean | Prisma.MaintenanceOccurrence$notificationsArgs<ExtArgs>;
    _count?: boolean | Prisma.MaintenanceOccurrenceCountOutputTypeDefaultArgs<ExtArgs>;
};
export type MaintenanceOccurrenceIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    maintenancePlan?: boolean | Prisma.MaintenancePlanDefaultArgs<ExtArgs>;
    completedBy?: boolean | Prisma.MaintenanceOccurrence$completedByArgs<ExtArgs>;
};
export type MaintenanceOccurrenceIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    maintenancePlan?: boolean | Prisma.MaintenancePlanDefaultArgs<ExtArgs>;
    completedBy?: boolean | Prisma.MaintenanceOccurrence$completedByArgs<ExtArgs>;
};
export type $MaintenanceOccurrencePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "MaintenanceOccurrence";
    objects: {
        maintenancePlan: Prisma.$MaintenancePlanPayload<ExtArgs>;
        completedBy: Prisma.$UserPayload<ExtArgs> | null;
        linkedWorkOrder: Prisma.$WorkOrderPayload<ExtArgs>[];
        notifications: Prisma.$NotificationPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        maintenancePlanId: number;
        dueDate: Date;
        status: $Enums.MaintenanceOccurrenceStatus;
        completedAt: Date | null;
        completedById: number | null;
        workPerformed: string | null;
        remarks: string | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["maintenanceOccurrence"]>;
    composites: {};
};
export type MaintenanceOccurrenceGetPayload<S extends boolean | null | undefined | MaintenanceOccurrenceDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$MaintenanceOccurrencePayload, S>;
export type MaintenanceOccurrenceCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<MaintenanceOccurrenceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: MaintenanceOccurrenceCountAggregateInputType | true;
};
export interface MaintenanceOccurrenceDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['MaintenanceOccurrence'];
        meta: {
            name: 'MaintenanceOccurrence';
        };
    };
    /**
     * Find zero or one MaintenanceOccurrence that matches the filter.
     * @param {MaintenanceOccurrenceFindUniqueArgs} args - Arguments to find a MaintenanceOccurrence
     * @example
     * // Get one MaintenanceOccurrence
     * const maintenanceOccurrence = await prisma.maintenanceOccurrence.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MaintenanceOccurrenceFindUniqueArgs>(args: Prisma.SelectSubset<T, MaintenanceOccurrenceFindUniqueArgs<ExtArgs>>): Prisma.Prisma__MaintenanceOccurrenceClient<runtime.Types.Result.GetResult<Prisma.$MaintenanceOccurrencePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one MaintenanceOccurrence that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MaintenanceOccurrenceFindUniqueOrThrowArgs} args - Arguments to find a MaintenanceOccurrence
     * @example
     * // Get one MaintenanceOccurrence
     * const maintenanceOccurrence = await prisma.maintenanceOccurrence.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MaintenanceOccurrenceFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, MaintenanceOccurrenceFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__MaintenanceOccurrenceClient<runtime.Types.Result.GetResult<Prisma.$MaintenanceOccurrencePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first MaintenanceOccurrence that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaintenanceOccurrenceFindFirstArgs} args - Arguments to find a MaintenanceOccurrence
     * @example
     * // Get one MaintenanceOccurrence
     * const maintenanceOccurrence = await prisma.maintenanceOccurrence.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MaintenanceOccurrenceFindFirstArgs>(args?: Prisma.SelectSubset<T, MaintenanceOccurrenceFindFirstArgs<ExtArgs>>): Prisma.Prisma__MaintenanceOccurrenceClient<runtime.Types.Result.GetResult<Prisma.$MaintenanceOccurrencePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first MaintenanceOccurrence that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaintenanceOccurrenceFindFirstOrThrowArgs} args - Arguments to find a MaintenanceOccurrence
     * @example
     * // Get one MaintenanceOccurrence
     * const maintenanceOccurrence = await prisma.maintenanceOccurrence.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MaintenanceOccurrenceFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, MaintenanceOccurrenceFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__MaintenanceOccurrenceClient<runtime.Types.Result.GetResult<Prisma.$MaintenanceOccurrencePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more MaintenanceOccurrences that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaintenanceOccurrenceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MaintenanceOccurrences
     * const maintenanceOccurrences = await prisma.maintenanceOccurrence.findMany()
     *
     * // Get first 10 MaintenanceOccurrences
     * const maintenanceOccurrences = await prisma.maintenanceOccurrence.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const maintenanceOccurrenceWithIdOnly = await prisma.maintenanceOccurrence.findMany({ select: { id: true } })
     *
     */
    findMany<T extends MaintenanceOccurrenceFindManyArgs>(args?: Prisma.SelectSubset<T, MaintenanceOccurrenceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MaintenanceOccurrencePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a MaintenanceOccurrence.
     * @param {MaintenanceOccurrenceCreateArgs} args - Arguments to create a MaintenanceOccurrence.
     * @example
     * // Create one MaintenanceOccurrence
     * const MaintenanceOccurrence = await prisma.maintenanceOccurrence.create({
     *   data: {
     *     // ... data to create a MaintenanceOccurrence
     *   }
     * })
     *
     */
    create<T extends MaintenanceOccurrenceCreateArgs>(args: Prisma.SelectSubset<T, MaintenanceOccurrenceCreateArgs<ExtArgs>>): Prisma.Prisma__MaintenanceOccurrenceClient<runtime.Types.Result.GetResult<Prisma.$MaintenanceOccurrencePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many MaintenanceOccurrences.
     * @param {MaintenanceOccurrenceCreateManyArgs} args - Arguments to create many MaintenanceOccurrences.
     * @example
     * // Create many MaintenanceOccurrences
     * const maintenanceOccurrence = await prisma.maintenanceOccurrence.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends MaintenanceOccurrenceCreateManyArgs>(args?: Prisma.SelectSubset<T, MaintenanceOccurrenceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many MaintenanceOccurrences and returns the data saved in the database.
     * @param {MaintenanceOccurrenceCreateManyAndReturnArgs} args - Arguments to create many MaintenanceOccurrences.
     * @example
     * // Create many MaintenanceOccurrences
     * const maintenanceOccurrence = await prisma.maintenanceOccurrence.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many MaintenanceOccurrences and only return the `id`
     * const maintenanceOccurrenceWithIdOnly = await prisma.maintenanceOccurrence.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends MaintenanceOccurrenceCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, MaintenanceOccurrenceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MaintenanceOccurrencePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a MaintenanceOccurrence.
     * @param {MaintenanceOccurrenceDeleteArgs} args - Arguments to delete one MaintenanceOccurrence.
     * @example
     * // Delete one MaintenanceOccurrence
     * const MaintenanceOccurrence = await prisma.maintenanceOccurrence.delete({
     *   where: {
     *     // ... filter to delete one MaintenanceOccurrence
     *   }
     * })
     *
     */
    delete<T extends MaintenanceOccurrenceDeleteArgs>(args: Prisma.SelectSubset<T, MaintenanceOccurrenceDeleteArgs<ExtArgs>>): Prisma.Prisma__MaintenanceOccurrenceClient<runtime.Types.Result.GetResult<Prisma.$MaintenanceOccurrencePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one MaintenanceOccurrence.
     * @param {MaintenanceOccurrenceUpdateArgs} args - Arguments to update one MaintenanceOccurrence.
     * @example
     * // Update one MaintenanceOccurrence
     * const maintenanceOccurrence = await prisma.maintenanceOccurrence.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends MaintenanceOccurrenceUpdateArgs>(args: Prisma.SelectSubset<T, MaintenanceOccurrenceUpdateArgs<ExtArgs>>): Prisma.Prisma__MaintenanceOccurrenceClient<runtime.Types.Result.GetResult<Prisma.$MaintenanceOccurrencePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more MaintenanceOccurrences.
     * @param {MaintenanceOccurrenceDeleteManyArgs} args - Arguments to filter MaintenanceOccurrences to delete.
     * @example
     * // Delete a few MaintenanceOccurrences
     * const { count } = await prisma.maintenanceOccurrence.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends MaintenanceOccurrenceDeleteManyArgs>(args?: Prisma.SelectSubset<T, MaintenanceOccurrenceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more MaintenanceOccurrences.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaintenanceOccurrenceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MaintenanceOccurrences
     * const maintenanceOccurrence = await prisma.maintenanceOccurrence.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends MaintenanceOccurrenceUpdateManyArgs>(args: Prisma.SelectSubset<T, MaintenanceOccurrenceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more MaintenanceOccurrences and returns the data updated in the database.
     * @param {MaintenanceOccurrenceUpdateManyAndReturnArgs} args - Arguments to update many MaintenanceOccurrences.
     * @example
     * // Update many MaintenanceOccurrences
     * const maintenanceOccurrence = await prisma.maintenanceOccurrence.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more MaintenanceOccurrences and only return the `id`
     * const maintenanceOccurrenceWithIdOnly = await prisma.maintenanceOccurrence.updateManyAndReturn({
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
    updateManyAndReturn<T extends MaintenanceOccurrenceUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, MaintenanceOccurrenceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MaintenanceOccurrencePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one MaintenanceOccurrence.
     * @param {MaintenanceOccurrenceUpsertArgs} args - Arguments to update or create a MaintenanceOccurrence.
     * @example
     * // Update or create a MaintenanceOccurrence
     * const maintenanceOccurrence = await prisma.maintenanceOccurrence.upsert({
     *   create: {
     *     // ... data to create a MaintenanceOccurrence
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MaintenanceOccurrence we want to update
     *   }
     * })
     */
    upsert<T extends MaintenanceOccurrenceUpsertArgs>(args: Prisma.SelectSubset<T, MaintenanceOccurrenceUpsertArgs<ExtArgs>>): Prisma.Prisma__MaintenanceOccurrenceClient<runtime.Types.Result.GetResult<Prisma.$MaintenanceOccurrencePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of MaintenanceOccurrences.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaintenanceOccurrenceCountArgs} args - Arguments to filter MaintenanceOccurrences to count.
     * @example
     * // Count the number of MaintenanceOccurrences
     * const count = await prisma.maintenanceOccurrence.count({
     *   where: {
     *     // ... the filter for the MaintenanceOccurrences we want to count
     *   }
     * })
    **/
    count<T extends MaintenanceOccurrenceCountArgs>(args?: Prisma.Subset<T, MaintenanceOccurrenceCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], MaintenanceOccurrenceCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a MaintenanceOccurrence.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaintenanceOccurrenceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends MaintenanceOccurrenceAggregateArgs>(args: Prisma.Subset<T, MaintenanceOccurrenceAggregateArgs>): Prisma.PrismaPromise<GetMaintenanceOccurrenceAggregateType<T>>;
    /**
     * Group by MaintenanceOccurrence.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaintenanceOccurrenceGroupByArgs} args - Group by arguments.
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
    groupBy<T extends MaintenanceOccurrenceGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: MaintenanceOccurrenceGroupByArgs['orderBy'];
    } : {
        orderBy?: MaintenanceOccurrenceGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, MaintenanceOccurrenceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMaintenanceOccurrenceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the MaintenanceOccurrence model
     */
    readonly fields: MaintenanceOccurrenceFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for MaintenanceOccurrence.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__MaintenanceOccurrenceClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    maintenancePlan<T extends Prisma.MaintenancePlanDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.MaintenancePlanDefaultArgs<ExtArgs>>): Prisma.Prisma__MaintenancePlanClient<runtime.Types.Result.GetResult<Prisma.$MaintenancePlanPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    completedBy<T extends Prisma.MaintenanceOccurrence$completedByArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.MaintenanceOccurrence$completedByArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    linkedWorkOrder<T extends Prisma.MaintenanceOccurrence$linkedWorkOrderArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.MaintenanceOccurrence$linkedWorkOrderArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WorkOrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    notifications<T extends Prisma.MaintenanceOccurrence$notificationsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.MaintenanceOccurrence$notificationsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
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
 * Fields of the MaintenanceOccurrence model
 */
export interface MaintenanceOccurrenceFieldRefs {
    readonly id: Prisma.FieldRef<"MaintenanceOccurrence", 'Int'>;
    readonly maintenancePlanId: Prisma.FieldRef<"MaintenanceOccurrence", 'Int'>;
    readonly dueDate: Prisma.FieldRef<"MaintenanceOccurrence", 'DateTime'>;
    readonly status: Prisma.FieldRef<"MaintenanceOccurrence", 'MaintenanceOccurrenceStatus'>;
    readonly completedAt: Prisma.FieldRef<"MaintenanceOccurrence", 'DateTime'>;
    readonly completedById: Prisma.FieldRef<"MaintenanceOccurrence", 'Int'>;
    readonly workPerformed: Prisma.FieldRef<"MaintenanceOccurrence", 'String'>;
    readonly remarks: Prisma.FieldRef<"MaintenanceOccurrence", 'String'>;
    readonly createdAt: Prisma.FieldRef<"MaintenanceOccurrence", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"MaintenanceOccurrence", 'DateTime'>;
}
/**
 * MaintenanceOccurrence findUnique
 */
export type MaintenanceOccurrenceFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaintenanceOccurrence
     */
    select?: Prisma.MaintenanceOccurrenceSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MaintenanceOccurrence
     */
    omit?: Prisma.MaintenanceOccurrenceOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MaintenanceOccurrenceInclude<ExtArgs> | null;
    /**
     * Filter, which MaintenanceOccurrence to fetch.
     */
    where: Prisma.MaintenanceOccurrenceWhereUniqueInput;
};
/**
 * MaintenanceOccurrence findUniqueOrThrow
 */
export type MaintenanceOccurrenceFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaintenanceOccurrence
     */
    select?: Prisma.MaintenanceOccurrenceSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MaintenanceOccurrence
     */
    omit?: Prisma.MaintenanceOccurrenceOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MaintenanceOccurrenceInclude<ExtArgs> | null;
    /**
     * Filter, which MaintenanceOccurrence to fetch.
     */
    where: Prisma.MaintenanceOccurrenceWhereUniqueInput;
};
/**
 * MaintenanceOccurrence findFirst
 */
export type MaintenanceOccurrenceFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaintenanceOccurrence
     */
    select?: Prisma.MaintenanceOccurrenceSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MaintenanceOccurrence
     */
    omit?: Prisma.MaintenanceOccurrenceOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MaintenanceOccurrenceInclude<ExtArgs> | null;
    /**
     * Filter, which MaintenanceOccurrence to fetch.
     */
    where?: Prisma.MaintenanceOccurrenceWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of MaintenanceOccurrences to fetch.
     */
    orderBy?: Prisma.MaintenanceOccurrenceOrderByWithRelationInput | Prisma.MaintenanceOccurrenceOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for MaintenanceOccurrences.
     */
    cursor?: Prisma.MaintenanceOccurrenceWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` MaintenanceOccurrences from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` MaintenanceOccurrences.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of MaintenanceOccurrences.
     */
    distinct?: Prisma.MaintenanceOccurrenceScalarFieldEnum | Prisma.MaintenanceOccurrenceScalarFieldEnum[];
};
/**
 * MaintenanceOccurrence findFirstOrThrow
 */
export type MaintenanceOccurrenceFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaintenanceOccurrence
     */
    select?: Prisma.MaintenanceOccurrenceSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MaintenanceOccurrence
     */
    omit?: Prisma.MaintenanceOccurrenceOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MaintenanceOccurrenceInclude<ExtArgs> | null;
    /**
     * Filter, which MaintenanceOccurrence to fetch.
     */
    where?: Prisma.MaintenanceOccurrenceWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of MaintenanceOccurrences to fetch.
     */
    orderBy?: Prisma.MaintenanceOccurrenceOrderByWithRelationInput | Prisma.MaintenanceOccurrenceOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for MaintenanceOccurrences.
     */
    cursor?: Prisma.MaintenanceOccurrenceWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` MaintenanceOccurrences from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` MaintenanceOccurrences.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of MaintenanceOccurrences.
     */
    distinct?: Prisma.MaintenanceOccurrenceScalarFieldEnum | Prisma.MaintenanceOccurrenceScalarFieldEnum[];
};
/**
 * MaintenanceOccurrence findMany
 */
export type MaintenanceOccurrenceFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaintenanceOccurrence
     */
    select?: Prisma.MaintenanceOccurrenceSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MaintenanceOccurrence
     */
    omit?: Prisma.MaintenanceOccurrenceOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MaintenanceOccurrenceInclude<ExtArgs> | null;
    /**
     * Filter, which MaintenanceOccurrences to fetch.
     */
    where?: Prisma.MaintenanceOccurrenceWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of MaintenanceOccurrences to fetch.
     */
    orderBy?: Prisma.MaintenanceOccurrenceOrderByWithRelationInput | Prisma.MaintenanceOccurrenceOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing MaintenanceOccurrences.
     */
    cursor?: Prisma.MaintenanceOccurrenceWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` MaintenanceOccurrences from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` MaintenanceOccurrences.
     */
    skip?: number;
    distinct?: Prisma.MaintenanceOccurrenceScalarFieldEnum | Prisma.MaintenanceOccurrenceScalarFieldEnum[];
};
/**
 * MaintenanceOccurrence create
 */
export type MaintenanceOccurrenceCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaintenanceOccurrence
     */
    select?: Prisma.MaintenanceOccurrenceSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MaintenanceOccurrence
     */
    omit?: Prisma.MaintenanceOccurrenceOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MaintenanceOccurrenceInclude<ExtArgs> | null;
    /**
     * The data needed to create a MaintenanceOccurrence.
     */
    data: Prisma.XOR<Prisma.MaintenanceOccurrenceCreateInput, Prisma.MaintenanceOccurrenceUncheckedCreateInput>;
};
/**
 * MaintenanceOccurrence createMany
 */
export type MaintenanceOccurrenceCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many MaintenanceOccurrences.
     */
    data: Prisma.MaintenanceOccurrenceCreateManyInput | Prisma.MaintenanceOccurrenceCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * MaintenanceOccurrence createManyAndReturn
 */
export type MaintenanceOccurrenceCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaintenanceOccurrence
     */
    select?: Prisma.MaintenanceOccurrenceSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the MaintenanceOccurrence
     */
    omit?: Prisma.MaintenanceOccurrenceOmit<ExtArgs> | null;
    /**
     * The data used to create many MaintenanceOccurrences.
     */
    data: Prisma.MaintenanceOccurrenceCreateManyInput | Prisma.MaintenanceOccurrenceCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MaintenanceOccurrenceIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * MaintenanceOccurrence update
 */
export type MaintenanceOccurrenceUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaintenanceOccurrence
     */
    select?: Prisma.MaintenanceOccurrenceSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MaintenanceOccurrence
     */
    omit?: Prisma.MaintenanceOccurrenceOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MaintenanceOccurrenceInclude<ExtArgs> | null;
    /**
     * The data needed to update a MaintenanceOccurrence.
     */
    data: Prisma.XOR<Prisma.MaintenanceOccurrenceUpdateInput, Prisma.MaintenanceOccurrenceUncheckedUpdateInput>;
    /**
     * Choose, which MaintenanceOccurrence to update.
     */
    where: Prisma.MaintenanceOccurrenceWhereUniqueInput;
};
/**
 * MaintenanceOccurrence updateMany
 */
export type MaintenanceOccurrenceUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update MaintenanceOccurrences.
     */
    data: Prisma.XOR<Prisma.MaintenanceOccurrenceUpdateManyMutationInput, Prisma.MaintenanceOccurrenceUncheckedUpdateManyInput>;
    /**
     * Filter which MaintenanceOccurrences to update
     */
    where?: Prisma.MaintenanceOccurrenceWhereInput;
    /**
     * Limit how many MaintenanceOccurrences to update.
     */
    limit?: number;
};
/**
 * MaintenanceOccurrence updateManyAndReturn
 */
export type MaintenanceOccurrenceUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaintenanceOccurrence
     */
    select?: Prisma.MaintenanceOccurrenceSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the MaintenanceOccurrence
     */
    omit?: Prisma.MaintenanceOccurrenceOmit<ExtArgs> | null;
    /**
     * The data used to update MaintenanceOccurrences.
     */
    data: Prisma.XOR<Prisma.MaintenanceOccurrenceUpdateManyMutationInput, Prisma.MaintenanceOccurrenceUncheckedUpdateManyInput>;
    /**
     * Filter which MaintenanceOccurrences to update
     */
    where?: Prisma.MaintenanceOccurrenceWhereInput;
    /**
     * Limit how many MaintenanceOccurrences to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MaintenanceOccurrenceIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * MaintenanceOccurrence upsert
 */
export type MaintenanceOccurrenceUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaintenanceOccurrence
     */
    select?: Prisma.MaintenanceOccurrenceSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MaintenanceOccurrence
     */
    omit?: Prisma.MaintenanceOccurrenceOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MaintenanceOccurrenceInclude<ExtArgs> | null;
    /**
     * The filter to search for the MaintenanceOccurrence to update in case it exists.
     */
    where: Prisma.MaintenanceOccurrenceWhereUniqueInput;
    /**
     * In case the MaintenanceOccurrence found by the `where` argument doesn't exist, create a new MaintenanceOccurrence with this data.
     */
    create: Prisma.XOR<Prisma.MaintenanceOccurrenceCreateInput, Prisma.MaintenanceOccurrenceUncheckedCreateInput>;
    /**
     * In case the MaintenanceOccurrence was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.MaintenanceOccurrenceUpdateInput, Prisma.MaintenanceOccurrenceUncheckedUpdateInput>;
};
/**
 * MaintenanceOccurrence delete
 */
export type MaintenanceOccurrenceDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaintenanceOccurrence
     */
    select?: Prisma.MaintenanceOccurrenceSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MaintenanceOccurrence
     */
    omit?: Prisma.MaintenanceOccurrenceOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MaintenanceOccurrenceInclude<ExtArgs> | null;
    /**
     * Filter which MaintenanceOccurrence to delete.
     */
    where: Prisma.MaintenanceOccurrenceWhereUniqueInput;
};
/**
 * MaintenanceOccurrence deleteMany
 */
export type MaintenanceOccurrenceDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which MaintenanceOccurrences to delete
     */
    where?: Prisma.MaintenanceOccurrenceWhereInput;
    /**
     * Limit how many MaintenanceOccurrences to delete.
     */
    limit?: number;
};
/**
 * MaintenanceOccurrence.completedBy
 */
export type MaintenanceOccurrence$completedByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
};
/**
 * MaintenanceOccurrence.linkedWorkOrder
 */
export type MaintenanceOccurrence$linkedWorkOrderArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkOrder
     */
    select?: Prisma.WorkOrderSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the WorkOrder
     */
    omit?: Prisma.WorkOrderOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.WorkOrderInclude<ExtArgs> | null;
    where?: Prisma.WorkOrderWhereInput;
    orderBy?: Prisma.WorkOrderOrderByWithRelationInput | Prisma.WorkOrderOrderByWithRelationInput[];
    cursor?: Prisma.WorkOrderWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.WorkOrderScalarFieldEnum | Prisma.WorkOrderScalarFieldEnum[];
};
/**
 * MaintenanceOccurrence.notifications
 */
export type MaintenanceOccurrence$notificationsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: Prisma.NotificationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Notification
     */
    omit?: Prisma.NotificationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.NotificationInclude<ExtArgs> | null;
    where?: Prisma.NotificationWhereInput;
    orderBy?: Prisma.NotificationOrderByWithRelationInput | Prisma.NotificationOrderByWithRelationInput[];
    cursor?: Prisma.NotificationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.NotificationScalarFieldEnum | Prisma.NotificationScalarFieldEnum[];
};
/**
 * MaintenanceOccurrence without action
 */
export type MaintenanceOccurrenceDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaintenanceOccurrence
     */
    select?: Prisma.MaintenanceOccurrenceSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MaintenanceOccurrence
     */
    omit?: Prisma.MaintenanceOccurrenceOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MaintenanceOccurrenceInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=MaintenanceOccurrence.d.ts.map