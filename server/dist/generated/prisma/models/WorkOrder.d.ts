import type * as runtime from "@prisma/client/runtime/library";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model WorkOrder
 *
 */
export type WorkOrderModel = runtime.Types.Result.DefaultSelection<Prisma.$WorkOrderPayload>;
export type AggregateWorkOrder = {
    _count: WorkOrderCountAggregateOutputType | null;
    _avg: WorkOrderAvgAggregateOutputType | null;
    _sum: WorkOrderSumAggregateOutputType | null;
    _min: WorkOrderMinAggregateOutputType | null;
    _max: WorkOrderMaxAggregateOutputType | null;
};
export type WorkOrderAvgAggregateOutputType = {
    id: number | null;
    maintenanceRequestId: number | null;
    equipmentId: number | null;
    maintenanceOccurrenceId: number | null;
    assignedTechnicianId: number | null;
    assignedById: number | null;
};
export type WorkOrderSumAggregateOutputType = {
    id: number | null;
    maintenanceRequestId: number | null;
    equipmentId: number | null;
    maintenanceOccurrenceId: number | null;
    assignedTechnicianId: number | null;
    assignedById: number | null;
};
export type WorkOrderMinAggregateOutputType = {
    id: number | null;
    workOrderNumber: string | null;
    maintenanceRequestId: number | null;
    equipmentId: number | null;
    status: $Enums.WorkOrderStatus | null;
    maintenanceOccurrenceId: number | null;
    assignedTechnicianId: number | null;
    assignedById: number | null;
    assignedAt: Date | null;
    startedAt: Date | null;
    completedAt: Date | null;
    closedAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type WorkOrderMaxAggregateOutputType = {
    id: number | null;
    workOrderNumber: string | null;
    maintenanceRequestId: number | null;
    equipmentId: number | null;
    status: $Enums.WorkOrderStatus | null;
    maintenanceOccurrenceId: number | null;
    assignedTechnicianId: number | null;
    assignedById: number | null;
    assignedAt: Date | null;
    startedAt: Date | null;
    completedAt: Date | null;
    closedAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type WorkOrderCountAggregateOutputType = {
    id: number;
    workOrderNumber: number;
    maintenanceRequestId: number;
    equipmentId: number;
    status: number;
    maintenanceOccurrenceId: number;
    assignedTechnicianId: number;
    assignedById: number;
    assignedAt: number;
    startedAt: number;
    completedAt: number;
    closedAt: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type WorkOrderAvgAggregateInputType = {
    id?: true;
    maintenanceRequestId?: true;
    equipmentId?: true;
    maintenanceOccurrenceId?: true;
    assignedTechnicianId?: true;
    assignedById?: true;
};
export type WorkOrderSumAggregateInputType = {
    id?: true;
    maintenanceRequestId?: true;
    equipmentId?: true;
    maintenanceOccurrenceId?: true;
    assignedTechnicianId?: true;
    assignedById?: true;
};
export type WorkOrderMinAggregateInputType = {
    id?: true;
    workOrderNumber?: true;
    maintenanceRequestId?: true;
    equipmentId?: true;
    status?: true;
    maintenanceOccurrenceId?: true;
    assignedTechnicianId?: true;
    assignedById?: true;
    assignedAt?: true;
    startedAt?: true;
    completedAt?: true;
    closedAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type WorkOrderMaxAggregateInputType = {
    id?: true;
    workOrderNumber?: true;
    maintenanceRequestId?: true;
    equipmentId?: true;
    status?: true;
    maintenanceOccurrenceId?: true;
    assignedTechnicianId?: true;
    assignedById?: true;
    assignedAt?: true;
    startedAt?: true;
    completedAt?: true;
    closedAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type WorkOrderCountAggregateInputType = {
    id?: true;
    workOrderNumber?: true;
    maintenanceRequestId?: true;
    equipmentId?: true;
    status?: true;
    maintenanceOccurrenceId?: true;
    assignedTechnicianId?: true;
    assignedById?: true;
    assignedAt?: true;
    startedAt?: true;
    completedAt?: true;
    closedAt?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type WorkOrderAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which WorkOrder to aggregate.
     */
    where?: Prisma.WorkOrderWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of WorkOrders to fetch.
     */
    orderBy?: Prisma.WorkOrderOrderByWithRelationInput | Prisma.WorkOrderOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.WorkOrderWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` WorkOrders from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` WorkOrders.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned WorkOrders
    **/
    _count?: true | WorkOrderCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: WorkOrderAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: WorkOrderSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: WorkOrderMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: WorkOrderMaxAggregateInputType;
};
export type GetWorkOrderAggregateType<T extends WorkOrderAggregateArgs> = {
    [P in keyof T & keyof AggregateWorkOrder]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateWorkOrder[P]> : Prisma.GetScalarType<T[P], AggregateWorkOrder[P]>;
};
export type WorkOrderGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.WorkOrderWhereInput;
    orderBy?: Prisma.WorkOrderOrderByWithAggregationInput | Prisma.WorkOrderOrderByWithAggregationInput[];
    by: Prisma.WorkOrderScalarFieldEnum[] | Prisma.WorkOrderScalarFieldEnum;
    having?: Prisma.WorkOrderScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: WorkOrderCountAggregateInputType | true;
    _avg?: WorkOrderAvgAggregateInputType;
    _sum?: WorkOrderSumAggregateInputType;
    _min?: WorkOrderMinAggregateInputType;
    _max?: WorkOrderMaxAggregateInputType;
};
export type WorkOrderGroupByOutputType = {
    id: number;
    workOrderNumber: string;
    maintenanceRequestId: number;
    equipmentId: number;
    status: $Enums.WorkOrderStatus;
    maintenanceOccurrenceId: number | null;
    assignedTechnicianId: number | null;
    assignedById: number | null;
    assignedAt: Date | null;
    startedAt: Date | null;
    completedAt: Date | null;
    closedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    _count: WorkOrderCountAggregateOutputType | null;
    _avg: WorkOrderAvgAggregateOutputType | null;
    _sum: WorkOrderSumAggregateOutputType | null;
    _min: WorkOrderMinAggregateOutputType | null;
    _max: WorkOrderMaxAggregateOutputType | null;
};
type GetWorkOrderGroupByPayload<T extends WorkOrderGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<WorkOrderGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof WorkOrderGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], WorkOrderGroupByOutputType[P]> : Prisma.GetScalarType<T[P], WorkOrderGroupByOutputType[P]>;
}>>;
export type WorkOrderWhereInput = {
    AND?: Prisma.WorkOrderWhereInput | Prisma.WorkOrderWhereInput[];
    OR?: Prisma.WorkOrderWhereInput[];
    NOT?: Prisma.WorkOrderWhereInput | Prisma.WorkOrderWhereInput[];
    id?: Prisma.IntFilter<"WorkOrder"> | number;
    workOrderNumber?: Prisma.StringFilter<"WorkOrder"> | string;
    maintenanceRequestId?: Prisma.IntFilter<"WorkOrder"> | number;
    equipmentId?: Prisma.IntFilter<"WorkOrder"> | number;
    status?: Prisma.EnumWorkOrderStatusFilter<"WorkOrder"> | $Enums.WorkOrderStatus;
    maintenanceOccurrenceId?: Prisma.IntNullableFilter<"WorkOrder"> | number | null;
    assignedTechnicianId?: Prisma.IntNullableFilter<"WorkOrder"> | number | null;
    assignedById?: Prisma.IntNullableFilter<"WorkOrder"> | number | null;
    assignedAt?: Prisma.DateTimeNullableFilter<"WorkOrder"> | Date | string | null;
    startedAt?: Prisma.DateTimeNullableFilter<"WorkOrder"> | Date | string | null;
    completedAt?: Prisma.DateTimeNullableFilter<"WorkOrder"> | Date | string | null;
    closedAt?: Prisma.DateTimeNullableFilter<"WorkOrder"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"WorkOrder"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"WorkOrder"> | Date | string;
    maintenanceRequest?: Prisma.XOR<Prisma.MaintenanceRequestScalarRelationFilter, Prisma.MaintenanceRequestWhereInput>;
    equipment?: Prisma.XOR<Prisma.EquipmentScalarRelationFilter, Prisma.EquipmentWhereInput>;
    maintenanceOccurrence?: Prisma.XOR<Prisma.MaintenanceOccurrenceNullableScalarRelationFilter, Prisma.MaintenanceOccurrenceWhereInput> | null;
    assignedTechnician?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
    assignedBy?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
};
export type WorkOrderOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    workOrderNumber?: Prisma.SortOrder;
    maintenanceRequestId?: Prisma.SortOrder;
    equipmentId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    maintenanceOccurrenceId?: Prisma.SortOrderInput | Prisma.SortOrder;
    assignedTechnicianId?: Prisma.SortOrderInput | Prisma.SortOrder;
    assignedById?: Prisma.SortOrderInput | Prisma.SortOrder;
    assignedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    startedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    completedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    closedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    maintenanceRequest?: Prisma.MaintenanceRequestOrderByWithRelationInput;
    equipment?: Prisma.EquipmentOrderByWithRelationInput;
    maintenanceOccurrence?: Prisma.MaintenanceOccurrenceOrderByWithRelationInput;
    assignedTechnician?: Prisma.UserOrderByWithRelationInput;
    assignedBy?: Prisma.UserOrderByWithRelationInput;
};
export type WorkOrderWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    workOrderNumber?: string;
    maintenanceRequestId?: number;
    maintenanceOccurrenceId?: number;
    AND?: Prisma.WorkOrderWhereInput | Prisma.WorkOrderWhereInput[];
    OR?: Prisma.WorkOrderWhereInput[];
    NOT?: Prisma.WorkOrderWhereInput | Prisma.WorkOrderWhereInput[];
    equipmentId?: Prisma.IntFilter<"WorkOrder"> | number;
    status?: Prisma.EnumWorkOrderStatusFilter<"WorkOrder"> | $Enums.WorkOrderStatus;
    assignedTechnicianId?: Prisma.IntNullableFilter<"WorkOrder"> | number | null;
    assignedById?: Prisma.IntNullableFilter<"WorkOrder"> | number | null;
    assignedAt?: Prisma.DateTimeNullableFilter<"WorkOrder"> | Date | string | null;
    startedAt?: Prisma.DateTimeNullableFilter<"WorkOrder"> | Date | string | null;
    completedAt?: Prisma.DateTimeNullableFilter<"WorkOrder"> | Date | string | null;
    closedAt?: Prisma.DateTimeNullableFilter<"WorkOrder"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"WorkOrder"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"WorkOrder"> | Date | string;
    maintenanceRequest?: Prisma.XOR<Prisma.MaintenanceRequestScalarRelationFilter, Prisma.MaintenanceRequestWhereInput>;
    equipment?: Prisma.XOR<Prisma.EquipmentScalarRelationFilter, Prisma.EquipmentWhereInput>;
    maintenanceOccurrence?: Prisma.XOR<Prisma.MaintenanceOccurrenceNullableScalarRelationFilter, Prisma.MaintenanceOccurrenceWhereInput> | null;
    assignedTechnician?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
    assignedBy?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
}, "id" | "workOrderNumber" | "maintenanceRequestId" | "maintenanceOccurrenceId">;
export type WorkOrderOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    workOrderNumber?: Prisma.SortOrder;
    maintenanceRequestId?: Prisma.SortOrder;
    equipmentId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    maintenanceOccurrenceId?: Prisma.SortOrderInput | Prisma.SortOrder;
    assignedTechnicianId?: Prisma.SortOrderInput | Prisma.SortOrder;
    assignedById?: Prisma.SortOrderInput | Prisma.SortOrder;
    assignedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    startedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    completedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    closedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.WorkOrderCountOrderByAggregateInput;
    _avg?: Prisma.WorkOrderAvgOrderByAggregateInput;
    _max?: Prisma.WorkOrderMaxOrderByAggregateInput;
    _min?: Prisma.WorkOrderMinOrderByAggregateInput;
    _sum?: Prisma.WorkOrderSumOrderByAggregateInput;
};
export type WorkOrderScalarWhereWithAggregatesInput = {
    AND?: Prisma.WorkOrderScalarWhereWithAggregatesInput | Prisma.WorkOrderScalarWhereWithAggregatesInput[];
    OR?: Prisma.WorkOrderScalarWhereWithAggregatesInput[];
    NOT?: Prisma.WorkOrderScalarWhereWithAggregatesInput | Prisma.WorkOrderScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"WorkOrder"> | number;
    workOrderNumber?: Prisma.StringWithAggregatesFilter<"WorkOrder"> | string;
    maintenanceRequestId?: Prisma.IntWithAggregatesFilter<"WorkOrder"> | number;
    equipmentId?: Prisma.IntWithAggregatesFilter<"WorkOrder"> | number;
    status?: Prisma.EnumWorkOrderStatusWithAggregatesFilter<"WorkOrder"> | $Enums.WorkOrderStatus;
    maintenanceOccurrenceId?: Prisma.IntNullableWithAggregatesFilter<"WorkOrder"> | number | null;
    assignedTechnicianId?: Prisma.IntNullableWithAggregatesFilter<"WorkOrder"> | number | null;
    assignedById?: Prisma.IntNullableWithAggregatesFilter<"WorkOrder"> | number | null;
    assignedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"WorkOrder"> | Date | string | null;
    startedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"WorkOrder"> | Date | string | null;
    completedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"WorkOrder"> | Date | string | null;
    closedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"WorkOrder"> | Date | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"WorkOrder"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"WorkOrder"> | Date | string;
};
export type WorkOrderCreateInput = {
    workOrderNumber: string;
    status?: $Enums.WorkOrderStatus;
    assignedAt?: Date | string | null;
    startedAt?: Date | string | null;
    completedAt?: Date | string | null;
    closedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    maintenanceRequest: Prisma.MaintenanceRequestCreateNestedOneWithoutWorkOrderInput;
    equipment: Prisma.EquipmentCreateNestedOneWithoutWorkOrdersInput;
    maintenanceOccurrence?: Prisma.MaintenanceOccurrenceCreateNestedOneWithoutLinkedWorkOrderInput;
    assignedTechnician?: Prisma.UserCreateNestedOneWithoutAssignedWorkOrdersInput;
    assignedBy?: Prisma.UserCreateNestedOneWithoutCreatedWorkOrdersInput;
};
export type WorkOrderUncheckedCreateInput = {
    id?: number;
    workOrderNumber: string;
    maintenanceRequestId: number;
    equipmentId: number;
    status?: $Enums.WorkOrderStatus;
    maintenanceOccurrenceId?: number | null;
    assignedTechnicianId?: number | null;
    assignedById?: number | null;
    assignedAt?: Date | string | null;
    startedAt?: Date | string | null;
    completedAt?: Date | string | null;
    closedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type WorkOrderUpdateInput = {
    workOrderNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumWorkOrderStatusFieldUpdateOperationsInput | $Enums.WorkOrderStatus;
    assignedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    closedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    maintenanceRequest?: Prisma.MaintenanceRequestUpdateOneRequiredWithoutWorkOrderNestedInput;
    equipment?: Prisma.EquipmentUpdateOneRequiredWithoutWorkOrdersNestedInput;
    maintenanceOccurrence?: Prisma.MaintenanceOccurrenceUpdateOneWithoutLinkedWorkOrderNestedInput;
    assignedTechnician?: Prisma.UserUpdateOneWithoutAssignedWorkOrdersNestedInput;
    assignedBy?: Prisma.UserUpdateOneWithoutCreatedWorkOrdersNestedInput;
};
export type WorkOrderUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    workOrderNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    maintenanceRequestId?: Prisma.IntFieldUpdateOperationsInput | number;
    equipmentId?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumWorkOrderStatusFieldUpdateOperationsInput | $Enums.WorkOrderStatus;
    maintenanceOccurrenceId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    assignedTechnicianId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    assignedById?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    assignedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    closedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type WorkOrderCreateManyInput = {
    id?: number;
    workOrderNumber: string;
    maintenanceRequestId: number;
    equipmentId: number;
    status?: $Enums.WorkOrderStatus;
    maintenanceOccurrenceId?: number | null;
    assignedTechnicianId?: number | null;
    assignedById?: number | null;
    assignedAt?: Date | string | null;
    startedAt?: Date | string | null;
    completedAt?: Date | string | null;
    closedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type WorkOrderUpdateManyMutationInput = {
    workOrderNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumWorkOrderStatusFieldUpdateOperationsInput | $Enums.WorkOrderStatus;
    assignedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    closedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type WorkOrderUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    workOrderNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    maintenanceRequestId?: Prisma.IntFieldUpdateOperationsInput | number;
    equipmentId?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumWorkOrderStatusFieldUpdateOperationsInput | $Enums.WorkOrderStatus;
    maintenanceOccurrenceId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    assignedTechnicianId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    assignedById?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    assignedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    closedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type WorkOrderListRelationFilter = {
    every?: Prisma.WorkOrderWhereInput;
    some?: Prisma.WorkOrderWhereInput;
    none?: Prisma.WorkOrderWhereInput;
};
export type WorkOrderOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type WorkOrderNullableScalarRelationFilter = {
    is?: Prisma.WorkOrderWhereInput | null;
    isNot?: Prisma.WorkOrderWhereInput | null;
};
export type WorkOrderCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    workOrderNumber?: Prisma.SortOrder;
    maintenanceRequestId?: Prisma.SortOrder;
    equipmentId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    maintenanceOccurrenceId?: Prisma.SortOrder;
    assignedTechnicianId?: Prisma.SortOrder;
    assignedById?: Prisma.SortOrder;
    assignedAt?: Prisma.SortOrder;
    startedAt?: Prisma.SortOrder;
    completedAt?: Prisma.SortOrder;
    closedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type WorkOrderAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    maintenanceRequestId?: Prisma.SortOrder;
    equipmentId?: Prisma.SortOrder;
    maintenanceOccurrenceId?: Prisma.SortOrder;
    assignedTechnicianId?: Prisma.SortOrder;
    assignedById?: Prisma.SortOrder;
};
export type WorkOrderMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    workOrderNumber?: Prisma.SortOrder;
    maintenanceRequestId?: Prisma.SortOrder;
    equipmentId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    maintenanceOccurrenceId?: Prisma.SortOrder;
    assignedTechnicianId?: Prisma.SortOrder;
    assignedById?: Prisma.SortOrder;
    assignedAt?: Prisma.SortOrder;
    startedAt?: Prisma.SortOrder;
    completedAt?: Prisma.SortOrder;
    closedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type WorkOrderMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    workOrderNumber?: Prisma.SortOrder;
    maintenanceRequestId?: Prisma.SortOrder;
    equipmentId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    maintenanceOccurrenceId?: Prisma.SortOrder;
    assignedTechnicianId?: Prisma.SortOrder;
    assignedById?: Prisma.SortOrder;
    assignedAt?: Prisma.SortOrder;
    startedAt?: Prisma.SortOrder;
    completedAt?: Prisma.SortOrder;
    closedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type WorkOrderSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    maintenanceRequestId?: Prisma.SortOrder;
    equipmentId?: Prisma.SortOrder;
    maintenanceOccurrenceId?: Prisma.SortOrder;
    assignedTechnicianId?: Prisma.SortOrder;
    assignedById?: Prisma.SortOrder;
};
export type WorkOrderCreateNestedManyWithoutAssignedTechnicianInput = {
    create?: Prisma.XOR<Prisma.WorkOrderCreateWithoutAssignedTechnicianInput, Prisma.WorkOrderUncheckedCreateWithoutAssignedTechnicianInput> | Prisma.WorkOrderCreateWithoutAssignedTechnicianInput[] | Prisma.WorkOrderUncheckedCreateWithoutAssignedTechnicianInput[];
    connectOrCreate?: Prisma.WorkOrderCreateOrConnectWithoutAssignedTechnicianInput | Prisma.WorkOrderCreateOrConnectWithoutAssignedTechnicianInput[];
    createMany?: Prisma.WorkOrderCreateManyAssignedTechnicianInputEnvelope;
    connect?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
};
export type WorkOrderCreateNestedManyWithoutAssignedByInput = {
    create?: Prisma.XOR<Prisma.WorkOrderCreateWithoutAssignedByInput, Prisma.WorkOrderUncheckedCreateWithoutAssignedByInput> | Prisma.WorkOrderCreateWithoutAssignedByInput[] | Prisma.WorkOrderUncheckedCreateWithoutAssignedByInput[];
    connectOrCreate?: Prisma.WorkOrderCreateOrConnectWithoutAssignedByInput | Prisma.WorkOrderCreateOrConnectWithoutAssignedByInput[];
    createMany?: Prisma.WorkOrderCreateManyAssignedByInputEnvelope;
    connect?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
};
export type WorkOrderUncheckedCreateNestedManyWithoutAssignedTechnicianInput = {
    create?: Prisma.XOR<Prisma.WorkOrderCreateWithoutAssignedTechnicianInput, Prisma.WorkOrderUncheckedCreateWithoutAssignedTechnicianInput> | Prisma.WorkOrderCreateWithoutAssignedTechnicianInput[] | Prisma.WorkOrderUncheckedCreateWithoutAssignedTechnicianInput[];
    connectOrCreate?: Prisma.WorkOrderCreateOrConnectWithoutAssignedTechnicianInput | Prisma.WorkOrderCreateOrConnectWithoutAssignedTechnicianInput[];
    createMany?: Prisma.WorkOrderCreateManyAssignedTechnicianInputEnvelope;
    connect?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
};
export type WorkOrderUncheckedCreateNestedManyWithoutAssignedByInput = {
    create?: Prisma.XOR<Prisma.WorkOrderCreateWithoutAssignedByInput, Prisma.WorkOrderUncheckedCreateWithoutAssignedByInput> | Prisma.WorkOrderCreateWithoutAssignedByInput[] | Prisma.WorkOrderUncheckedCreateWithoutAssignedByInput[];
    connectOrCreate?: Prisma.WorkOrderCreateOrConnectWithoutAssignedByInput | Prisma.WorkOrderCreateOrConnectWithoutAssignedByInput[];
    createMany?: Prisma.WorkOrderCreateManyAssignedByInputEnvelope;
    connect?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
};
export type WorkOrderUpdateManyWithoutAssignedTechnicianNestedInput = {
    create?: Prisma.XOR<Prisma.WorkOrderCreateWithoutAssignedTechnicianInput, Prisma.WorkOrderUncheckedCreateWithoutAssignedTechnicianInput> | Prisma.WorkOrderCreateWithoutAssignedTechnicianInput[] | Prisma.WorkOrderUncheckedCreateWithoutAssignedTechnicianInput[];
    connectOrCreate?: Prisma.WorkOrderCreateOrConnectWithoutAssignedTechnicianInput | Prisma.WorkOrderCreateOrConnectWithoutAssignedTechnicianInput[];
    upsert?: Prisma.WorkOrderUpsertWithWhereUniqueWithoutAssignedTechnicianInput | Prisma.WorkOrderUpsertWithWhereUniqueWithoutAssignedTechnicianInput[];
    createMany?: Prisma.WorkOrderCreateManyAssignedTechnicianInputEnvelope;
    set?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
    disconnect?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
    delete?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
    connect?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
    update?: Prisma.WorkOrderUpdateWithWhereUniqueWithoutAssignedTechnicianInput | Prisma.WorkOrderUpdateWithWhereUniqueWithoutAssignedTechnicianInput[];
    updateMany?: Prisma.WorkOrderUpdateManyWithWhereWithoutAssignedTechnicianInput | Prisma.WorkOrderUpdateManyWithWhereWithoutAssignedTechnicianInput[];
    deleteMany?: Prisma.WorkOrderScalarWhereInput | Prisma.WorkOrderScalarWhereInput[];
};
export type WorkOrderUpdateManyWithoutAssignedByNestedInput = {
    create?: Prisma.XOR<Prisma.WorkOrderCreateWithoutAssignedByInput, Prisma.WorkOrderUncheckedCreateWithoutAssignedByInput> | Prisma.WorkOrderCreateWithoutAssignedByInput[] | Prisma.WorkOrderUncheckedCreateWithoutAssignedByInput[];
    connectOrCreate?: Prisma.WorkOrderCreateOrConnectWithoutAssignedByInput | Prisma.WorkOrderCreateOrConnectWithoutAssignedByInput[];
    upsert?: Prisma.WorkOrderUpsertWithWhereUniqueWithoutAssignedByInput | Prisma.WorkOrderUpsertWithWhereUniqueWithoutAssignedByInput[];
    createMany?: Prisma.WorkOrderCreateManyAssignedByInputEnvelope;
    set?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
    disconnect?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
    delete?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
    connect?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
    update?: Prisma.WorkOrderUpdateWithWhereUniqueWithoutAssignedByInput | Prisma.WorkOrderUpdateWithWhereUniqueWithoutAssignedByInput[];
    updateMany?: Prisma.WorkOrderUpdateManyWithWhereWithoutAssignedByInput | Prisma.WorkOrderUpdateManyWithWhereWithoutAssignedByInput[];
    deleteMany?: Prisma.WorkOrderScalarWhereInput | Prisma.WorkOrderScalarWhereInput[];
};
export type WorkOrderUncheckedUpdateManyWithoutAssignedTechnicianNestedInput = {
    create?: Prisma.XOR<Prisma.WorkOrderCreateWithoutAssignedTechnicianInput, Prisma.WorkOrderUncheckedCreateWithoutAssignedTechnicianInput> | Prisma.WorkOrderCreateWithoutAssignedTechnicianInput[] | Prisma.WorkOrderUncheckedCreateWithoutAssignedTechnicianInput[];
    connectOrCreate?: Prisma.WorkOrderCreateOrConnectWithoutAssignedTechnicianInput | Prisma.WorkOrderCreateOrConnectWithoutAssignedTechnicianInput[];
    upsert?: Prisma.WorkOrderUpsertWithWhereUniqueWithoutAssignedTechnicianInput | Prisma.WorkOrderUpsertWithWhereUniqueWithoutAssignedTechnicianInput[];
    createMany?: Prisma.WorkOrderCreateManyAssignedTechnicianInputEnvelope;
    set?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
    disconnect?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
    delete?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
    connect?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
    update?: Prisma.WorkOrderUpdateWithWhereUniqueWithoutAssignedTechnicianInput | Prisma.WorkOrderUpdateWithWhereUniqueWithoutAssignedTechnicianInput[];
    updateMany?: Prisma.WorkOrderUpdateManyWithWhereWithoutAssignedTechnicianInput | Prisma.WorkOrderUpdateManyWithWhereWithoutAssignedTechnicianInput[];
    deleteMany?: Prisma.WorkOrderScalarWhereInput | Prisma.WorkOrderScalarWhereInput[];
};
export type WorkOrderUncheckedUpdateManyWithoutAssignedByNestedInput = {
    create?: Prisma.XOR<Prisma.WorkOrderCreateWithoutAssignedByInput, Prisma.WorkOrderUncheckedCreateWithoutAssignedByInput> | Prisma.WorkOrderCreateWithoutAssignedByInput[] | Prisma.WorkOrderUncheckedCreateWithoutAssignedByInput[];
    connectOrCreate?: Prisma.WorkOrderCreateOrConnectWithoutAssignedByInput | Prisma.WorkOrderCreateOrConnectWithoutAssignedByInput[];
    upsert?: Prisma.WorkOrderUpsertWithWhereUniqueWithoutAssignedByInput | Prisma.WorkOrderUpsertWithWhereUniqueWithoutAssignedByInput[];
    createMany?: Prisma.WorkOrderCreateManyAssignedByInputEnvelope;
    set?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
    disconnect?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
    delete?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
    connect?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
    update?: Prisma.WorkOrderUpdateWithWhereUniqueWithoutAssignedByInput | Prisma.WorkOrderUpdateWithWhereUniqueWithoutAssignedByInput[];
    updateMany?: Prisma.WorkOrderUpdateManyWithWhereWithoutAssignedByInput | Prisma.WorkOrderUpdateManyWithWhereWithoutAssignedByInput[];
    deleteMany?: Prisma.WorkOrderScalarWhereInput | Prisma.WorkOrderScalarWhereInput[];
};
export type WorkOrderCreateNestedManyWithoutEquipmentInput = {
    create?: Prisma.XOR<Prisma.WorkOrderCreateWithoutEquipmentInput, Prisma.WorkOrderUncheckedCreateWithoutEquipmentInput> | Prisma.WorkOrderCreateWithoutEquipmentInput[] | Prisma.WorkOrderUncheckedCreateWithoutEquipmentInput[];
    connectOrCreate?: Prisma.WorkOrderCreateOrConnectWithoutEquipmentInput | Prisma.WorkOrderCreateOrConnectWithoutEquipmentInput[];
    createMany?: Prisma.WorkOrderCreateManyEquipmentInputEnvelope;
    connect?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
};
export type WorkOrderUncheckedCreateNestedManyWithoutEquipmentInput = {
    create?: Prisma.XOR<Prisma.WorkOrderCreateWithoutEquipmentInput, Prisma.WorkOrderUncheckedCreateWithoutEquipmentInput> | Prisma.WorkOrderCreateWithoutEquipmentInput[] | Prisma.WorkOrderUncheckedCreateWithoutEquipmentInput[];
    connectOrCreate?: Prisma.WorkOrderCreateOrConnectWithoutEquipmentInput | Prisma.WorkOrderCreateOrConnectWithoutEquipmentInput[];
    createMany?: Prisma.WorkOrderCreateManyEquipmentInputEnvelope;
    connect?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
};
export type WorkOrderUpdateManyWithoutEquipmentNestedInput = {
    create?: Prisma.XOR<Prisma.WorkOrderCreateWithoutEquipmentInput, Prisma.WorkOrderUncheckedCreateWithoutEquipmentInput> | Prisma.WorkOrderCreateWithoutEquipmentInput[] | Prisma.WorkOrderUncheckedCreateWithoutEquipmentInput[];
    connectOrCreate?: Prisma.WorkOrderCreateOrConnectWithoutEquipmentInput | Prisma.WorkOrderCreateOrConnectWithoutEquipmentInput[];
    upsert?: Prisma.WorkOrderUpsertWithWhereUniqueWithoutEquipmentInput | Prisma.WorkOrderUpsertWithWhereUniqueWithoutEquipmentInput[];
    createMany?: Prisma.WorkOrderCreateManyEquipmentInputEnvelope;
    set?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
    disconnect?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
    delete?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
    connect?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
    update?: Prisma.WorkOrderUpdateWithWhereUniqueWithoutEquipmentInput | Prisma.WorkOrderUpdateWithWhereUniqueWithoutEquipmentInput[];
    updateMany?: Prisma.WorkOrderUpdateManyWithWhereWithoutEquipmentInput | Prisma.WorkOrderUpdateManyWithWhereWithoutEquipmentInput[];
    deleteMany?: Prisma.WorkOrderScalarWhereInput | Prisma.WorkOrderScalarWhereInput[];
};
export type WorkOrderUncheckedUpdateManyWithoutEquipmentNestedInput = {
    create?: Prisma.XOR<Prisma.WorkOrderCreateWithoutEquipmentInput, Prisma.WorkOrderUncheckedCreateWithoutEquipmentInput> | Prisma.WorkOrderCreateWithoutEquipmentInput[] | Prisma.WorkOrderUncheckedCreateWithoutEquipmentInput[];
    connectOrCreate?: Prisma.WorkOrderCreateOrConnectWithoutEquipmentInput | Prisma.WorkOrderCreateOrConnectWithoutEquipmentInput[];
    upsert?: Prisma.WorkOrderUpsertWithWhereUniqueWithoutEquipmentInput | Prisma.WorkOrderUpsertWithWhereUniqueWithoutEquipmentInput[];
    createMany?: Prisma.WorkOrderCreateManyEquipmentInputEnvelope;
    set?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
    disconnect?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
    delete?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
    connect?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
    update?: Prisma.WorkOrderUpdateWithWhereUniqueWithoutEquipmentInput | Prisma.WorkOrderUpdateWithWhereUniqueWithoutEquipmentInput[];
    updateMany?: Prisma.WorkOrderUpdateManyWithWhereWithoutEquipmentInput | Prisma.WorkOrderUpdateManyWithWhereWithoutEquipmentInput[];
    deleteMany?: Prisma.WorkOrderScalarWhereInput | Prisma.WorkOrderScalarWhereInput[];
};
export type WorkOrderCreateNestedOneWithoutMaintenanceRequestInput = {
    create?: Prisma.XOR<Prisma.WorkOrderCreateWithoutMaintenanceRequestInput, Prisma.WorkOrderUncheckedCreateWithoutMaintenanceRequestInput>;
    connectOrCreate?: Prisma.WorkOrderCreateOrConnectWithoutMaintenanceRequestInput;
    connect?: Prisma.WorkOrderWhereUniqueInput;
};
export type WorkOrderUncheckedCreateNestedOneWithoutMaintenanceRequestInput = {
    create?: Prisma.XOR<Prisma.WorkOrderCreateWithoutMaintenanceRequestInput, Prisma.WorkOrderUncheckedCreateWithoutMaintenanceRequestInput>;
    connectOrCreate?: Prisma.WorkOrderCreateOrConnectWithoutMaintenanceRequestInput;
    connect?: Prisma.WorkOrderWhereUniqueInput;
};
export type WorkOrderUpdateOneWithoutMaintenanceRequestNestedInput = {
    create?: Prisma.XOR<Prisma.WorkOrderCreateWithoutMaintenanceRequestInput, Prisma.WorkOrderUncheckedCreateWithoutMaintenanceRequestInput>;
    connectOrCreate?: Prisma.WorkOrderCreateOrConnectWithoutMaintenanceRequestInput;
    upsert?: Prisma.WorkOrderUpsertWithoutMaintenanceRequestInput;
    disconnect?: Prisma.WorkOrderWhereInput | boolean;
    delete?: Prisma.WorkOrderWhereInput | boolean;
    connect?: Prisma.WorkOrderWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.WorkOrderUpdateToOneWithWhereWithoutMaintenanceRequestInput, Prisma.WorkOrderUpdateWithoutMaintenanceRequestInput>, Prisma.WorkOrderUncheckedUpdateWithoutMaintenanceRequestInput>;
};
export type WorkOrderUncheckedUpdateOneWithoutMaintenanceRequestNestedInput = {
    create?: Prisma.XOR<Prisma.WorkOrderCreateWithoutMaintenanceRequestInput, Prisma.WorkOrderUncheckedCreateWithoutMaintenanceRequestInput>;
    connectOrCreate?: Prisma.WorkOrderCreateOrConnectWithoutMaintenanceRequestInput;
    upsert?: Prisma.WorkOrderUpsertWithoutMaintenanceRequestInput;
    disconnect?: Prisma.WorkOrderWhereInput | boolean;
    delete?: Prisma.WorkOrderWhereInput | boolean;
    connect?: Prisma.WorkOrderWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.WorkOrderUpdateToOneWithWhereWithoutMaintenanceRequestInput, Prisma.WorkOrderUpdateWithoutMaintenanceRequestInput>, Prisma.WorkOrderUncheckedUpdateWithoutMaintenanceRequestInput>;
};
export type EnumWorkOrderStatusFieldUpdateOperationsInput = {
    set?: $Enums.WorkOrderStatus;
};
export type WorkOrderCreateNestedManyWithoutMaintenanceOccurrenceInput = {
    create?: Prisma.XOR<Prisma.WorkOrderCreateWithoutMaintenanceOccurrenceInput, Prisma.WorkOrderUncheckedCreateWithoutMaintenanceOccurrenceInput> | Prisma.WorkOrderCreateWithoutMaintenanceOccurrenceInput[] | Prisma.WorkOrderUncheckedCreateWithoutMaintenanceOccurrenceInput[];
    connectOrCreate?: Prisma.WorkOrderCreateOrConnectWithoutMaintenanceOccurrenceInput | Prisma.WorkOrderCreateOrConnectWithoutMaintenanceOccurrenceInput[];
    createMany?: Prisma.WorkOrderCreateManyMaintenanceOccurrenceInputEnvelope;
    connect?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
};
export type WorkOrderUncheckedCreateNestedManyWithoutMaintenanceOccurrenceInput = {
    create?: Prisma.XOR<Prisma.WorkOrderCreateWithoutMaintenanceOccurrenceInput, Prisma.WorkOrderUncheckedCreateWithoutMaintenanceOccurrenceInput> | Prisma.WorkOrderCreateWithoutMaintenanceOccurrenceInput[] | Prisma.WorkOrderUncheckedCreateWithoutMaintenanceOccurrenceInput[];
    connectOrCreate?: Prisma.WorkOrderCreateOrConnectWithoutMaintenanceOccurrenceInput | Prisma.WorkOrderCreateOrConnectWithoutMaintenanceOccurrenceInput[];
    createMany?: Prisma.WorkOrderCreateManyMaintenanceOccurrenceInputEnvelope;
    connect?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
};
export type WorkOrderUpdateManyWithoutMaintenanceOccurrenceNestedInput = {
    create?: Prisma.XOR<Prisma.WorkOrderCreateWithoutMaintenanceOccurrenceInput, Prisma.WorkOrderUncheckedCreateWithoutMaintenanceOccurrenceInput> | Prisma.WorkOrderCreateWithoutMaintenanceOccurrenceInput[] | Prisma.WorkOrderUncheckedCreateWithoutMaintenanceOccurrenceInput[];
    connectOrCreate?: Prisma.WorkOrderCreateOrConnectWithoutMaintenanceOccurrenceInput | Prisma.WorkOrderCreateOrConnectWithoutMaintenanceOccurrenceInput[];
    upsert?: Prisma.WorkOrderUpsertWithWhereUniqueWithoutMaintenanceOccurrenceInput | Prisma.WorkOrderUpsertWithWhereUniqueWithoutMaintenanceOccurrenceInput[];
    createMany?: Prisma.WorkOrderCreateManyMaintenanceOccurrenceInputEnvelope;
    set?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
    disconnect?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
    delete?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
    connect?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
    update?: Prisma.WorkOrderUpdateWithWhereUniqueWithoutMaintenanceOccurrenceInput | Prisma.WorkOrderUpdateWithWhereUniqueWithoutMaintenanceOccurrenceInput[];
    updateMany?: Prisma.WorkOrderUpdateManyWithWhereWithoutMaintenanceOccurrenceInput | Prisma.WorkOrderUpdateManyWithWhereWithoutMaintenanceOccurrenceInput[];
    deleteMany?: Prisma.WorkOrderScalarWhereInput | Prisma.WorkOrderScalarWhereInput[];
};
export type WorkOrderUncheckedUpdateManyWithoutMaintenanceOccurrenceNestedInput = {
    create?: Prisma.XOR<Prisma.WorkOrderCreateWithoutMaintenanceOccurrenceInput, Prisma.WorkOrderUncheckedCreateWithoutMaintenanceOccurrenceInput> | Prisma.WorkOrderCreateWithoutMaintenanceOccurrenceInput[] | Prisma.WorkOrderUncheckedCreateWithoutMaintenanceOccurrenceInput[];
    connectOrCreate?: Prisma.WorkOrderCreateOrConnectWithoutMaintenanceOccurrenceInput | Prisma.WorkOrderCreateOrConnectWithoutMaintenanceOccurrenceInput[];
    upsert?: Prisma.WorkOrderUpsertWithWhereUniqueWithoutMaintenanceOccurrenceInput | Prisma.WorkOrderUpsertWithWhereUniqueWithoutMaintenanceOccurrenceInput[];
    createMany?: Prisma.WorkOrderCreateManyMaintenanceOccurrenceInputEnvelope;
    set?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
    disconnect?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
    delete?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
    connect?: Prisma.WorkOrderWhereUniqueInput | Prisma.WorkOrderWhereUniqueInput[];
    update?: Prisma.WorkOrderUpdateWithWhereUniqueWithoutMaintenanceOccurrenceInput | Prisma.WorkOrderUpdateWithWhereUniqueWithoutMaintenanceOccurrenceInput[];
    updateMany?: Prisma.WorkOrderUpdateManyWithWhereWithoutMaintenanceOccurrenceInput | Prisma.WorkOrderUpdateManyWithWhereWithoutMaintenanceOccurrenceInput[];
    deleteMany?: Prisma.WorkOrderScalarWhereInput | Prisma.WorkOrderScalarWhereInput[];
};
export type WorkOrderCreateWithoutAssignedTechnicianInput = {
    workOrderNumber: string;
    status?: $Enums.WorkOrderStatus;
    assignedAt?: Date | string | null;
    startedAt?: Date | string | null;
    completedAt?: Date | string | null;
    closedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    maintenanceRequest: Prisma.MaintenanceRequestCreateNestedOneWithoutWorkOrderInput;
    equipment: Prisma.EquipmentCreateNestedOneWithoutWorkOrdersInput;
    maintenanceOccurrence?: Prisma.MaintenanceOccurrenceCreateNestedOneWithoutLinkedWorkOrderInput;
    assignedBy?: Prisma.UserCreateNestedOneWithoutCreatedWorkOrdersInput;
};
export type WorkOrderUncheckedCreateWithoutAssignedTechnicianInput = {
    id?: number;
    workOrderNumber: string;
    maintenanceRequestId: number;
    equipmentId: number;
    status?: $Enums.WorkOrderStatus;
    maintenanceOccurrenceId?: number | null;
    assignedById?: number | null;
    assignedAt?: Date | string | null;
    startedAt?: Date | string | null;
    completedAt?: Date | string | null;
    closedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type WorkOrderCreateOrConnectWithoutAssignedTechnicianInput = {
    where: Prisma.WorkOrderWhereUniqueInput;
    create: Prisma.XOR<Prisma.WorkOrderCreateWithoutAssignedTechnicianInput, Prisma.WorkOrderUncheckedCreateWithoutAssignedTechnicianInput>;
};
export type WorkOrderCreateManyAssignedTechnicianInputEnvelope = {
    data: Prisma.WorkOrderCreateManyAssignedTechnicianInput | Prisma.WorkOrderCreateManyAssignedTechnicianInput[];
    skipDuplicates?: boolean;
};
export type WorkOrderCreateWithoutAssignedByInput = {
    workOrderNumber: string;
    status?: $Enums.WorkOrderStatus;
    assignedAt?: Date | string | null;
    startedAt?: Date | string | null;
    completedAt?: Date | string | null;
    closedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    maintenanceRequest: Prisma.MaintenanceRequestCreateNestedOneWithoutWorkOrderInput;
    equipment: Prisma.EquipmentCreateNestedOneWithoutWorkOrdersInput;
    maintenanceOccurrence?: Prisma.MaintenanceOccurrenceCreateNestedOneWithoutLinkedWorkOrderInput;
    assignedTechnician?: Prisma.UserCreateNestedOneWithoutAssignedWorkOrdersInput;
};
export type WorkOrderUncheckedCreateWithoutAssignedByInput = {
    id?: number;
    workOrderNumber: string;
    maintenanceRequestId: number;
    equipmentId: number;
    status?: $Enums.WorkOrderStatus;
    maintenanceOccurrenceId?: number | null;
    assignedTechnicianId?: number | null;
    assignedAt?: Date | string | null;
    startedAt?: Date | string | null;
    completedAt?: Date | string | null;
    closedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type WorkOrderCreateOrConnectWithoutAssignedByInput = {
    where: Prisma.WorkOrderWhereUniqueInput;
    create: Prisma.XOR<Prisma.WorkOrderCreateWithoutAssignedByInput, Prisma.WorkOrderUncheckedCreateWithoutAssignedByInput>;
};
export type WorkOrderCreateManyAssignedByInputEnvelope = {
    data: Prisma.WorkOrderCreateManyAssignedByInput | Prisma.WorkOrderCreateManyAssignedByInput[];
    skipDuplicates?: boolean;
};
export type WorkOrderUpsertWithWhereUniqueWithoutAssignedTechnicianInput = {
    where: Prisma.WorkOrderWhereUniqueInput;
    update: Prisma.XOR<Prisma.WorkOrderUpdateWithoutAssignedTechnicianInput, Prisma.WorkOrderUncheckedUpdateWithoutAssignedTechnicianInput>;
    create: Prisma.XOR<Prisma.WorkOrderCreateWithoutAssignedTechnicianInput, Prisma.WorkOrderUncheckedCreateWithoutAssignedTechnicianInput>;
};
export type WorkOrderUpdateWithWhereUniqueWithoutAssignedTechnicianInput = {
    where: Prisma.WorkOrderWhereUniqueInput;
    data: Prisma.XOR<Prisma.WorkOrderUpdateWithoutAssignedTechnicianInput, Prisma.WorkOrderUncheckedUpdateWithoutAssignedTechnicianInput>;
};
export type WorkOrderUpdateManyWithWhereWithoutAssignedTechnicianInput = {
    where: Prisma.WorkOrderScalarWhereInput;
    data: Prisma.XOR<Prisma.WorkOrderUpdateManyMutationInput, Prisma.WorkOrderUncheckedUpdateManyWithoutAssignedTechnicianInput>;
};
export type WorkOrderScalarWhereInput = {
    AND?: Prisma.WorkOrderScalarWhereInput | Prisma.WorkOrderScalarWhereInput[];
    OR?: Prisma.WorkOrderScalarWhereInput[];
    NOT?: Prisma.WorkOrderScalarWhereInput | Prisma.WorkOrderScalarWhereInput[];
    id?: Prisma.IntFilter<"WorkOrder"> | number;
    workOrderNumber?: Prisma.StringFilter<"WorkOrder"> | string;
    maintenanceRequestId?: Prisma.IntFilter<"WorkOrder"> | number;
    equipmentId?: Prisma.IntFilter<"WorkOrder"> | number;
    status?: Prisma.EnumWorkOrderStatusFilter<"WorkOrder"> | $Enums.WorkOrderStatus;
    maintenanceOccurrenceId?: Prisma.IntNullableFilter<"WorkOrder"> | number | null;
    assignedTechnicianId?: Prisma.IntNullableFilter<"WorkOrder"> | number | null;
    assignedById?: Prisma.IntNullableFilter<"WorkOrder"> | number | null;
    assignedAt?: Prisma.DateTimeNullableFilter<"WorkOrder"> | Date | string | null;
    startedAt?: Prisma.DateTimeNullableFilter<"WorkOrder"> | Date | string | null;
    completedAt?: Prisma.DateTimeNullableFilter<"WorkOrder"> | Date | string | null;
    closedAt?: Prisma.DateTimeNullableFilter<"WorkOrder"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"WorkOrder"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"WorkOrder"> | Date | string;
};
export type WorkOrderUpsertWithWhereUniqueWithoutAssignedByInput = {
    where: Prisma.WorkOrderWhereUniqueInput;
    update: Prisma.XOR<Prisma.WorkOrderUpdateWithoutAssignedByInput, Prisma.WorkOrderUncheckedUpdateWithoutAssignedByInput>;
    create: Prisma.XOR<Prisma.WorkOrderCreateWithoutAssignedByInput, Prisma.WorkOrderUncheckedCreateWithoutAssignedByInput>;
};
export type WorkOrderUpdateWithWhereUniqueWithoutAssignedByInput = {
    where: Prisma.WorkOrderWhereUniqueInput;
    data: Prisma.XOR<Prisma.WorkOrderUpdateWithoutAssignedByInput, Prisma.WorkOrderUncheckedUpdateWithoutAssignedByInput>;
};
export type WorkOrderUpdateManyWithWhereWithoutAssignedByInput = {
    where: Prisma.WorkOrderScalarWhereInput;
    data: Prisma.XOR<Prisma.WorkOrderUpdateManyMutationInput, Prisma.WorkOrderUncheckedUpdateManyWithoutAssignedByInput>;
};
export type WorkOrderCreateWithoutEquipmentInput = {
    workOrderNumber: string;
    status?: $Enums.WorkOrderStatus;
    assignedAt?: Date | string | null;
    startedAt?: Date | string | null;
    completedAt?: Date | string | null;
    closedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    maintenanceRequest: Prisma.MaintenanceRequestCreateNestedOneWithoutWorkOrderInput;
    maintenanceOccurrence?: Prisma.MaintenanceOccurrenceCreateNestedOneWithoutLinkedWorkOrderInput;
    assignedTechnician?: Prisma.UserCreateNestedOneWithoutAssignedWorkOrdersInput;
    assignedBy?: Prisma.UserCreateNestedOneWithoutCreatedWorkOrdersInput;
};
export type WorkOrderUncheckedCreateWithoutEquipmentInput = {
    id?: number;
    workOrderNumber: string;
    maintenanceRequestId: number;
    status?: $Enums.WorkOrderStatus;
    maintenanceOccurrenceId?: number | null;
    assignedTechnicianId?: number | null;
    assignedById?: number | null;
    assignedAt?: Date | string | null;
    startedAt?: Date | string | null;
    completedAt?: Date | string | null;
    closedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type WorkOrderCreateOrConnectWithoutEquipmentInput = {
    where: Prisma.WorkOrderWhereUniqueInput;
    create: Prisma.XOR<Prisma.WorkOrderCreateWithoutEquipmentInput, Prisma.WorkOrderUncheckedCreateWithoutEquipmentInput>;
};
export type WorkOrderCreateManyEquipmentInputEnvelope = {
    data: Prisma.WorkOrderCreateManyEquipmentInput | Prisma.WorkOrderCreateManyEquipmentInput[];
    skipDuplicates?: boolean;
};
export type WorkOrderUpsertWithWhereUniqueWithoutEquipmentInput = {
    where: Prisma.WorkOrderWhereUniqueInput;
    update: Prisma.XOR<Prisma.WorkOrderUpdateWithoutEquipmentInput, Prisma.WorkOrderUncheckedUpdateWithoutEquipmentInput>;
    create: Prisma.XOR<Prisma.WorkOrderCreateWithoutEquipmentInput, Prisma.WorkOrderUncheckedCreateWithoutEquipmentInput>;
};
export type WorkOrderUpdateWithWhereUniqueWithoutEquipmentInput = {
    where: Prisma.WorkOrderWhereUniqueInput;
    data: Prisma.XOR<Prisma.WorkOrderUpdateWithoutEquipmentInput, Prisma.WorkOrderUncheckedUpdateWithoutEquipmentInput>;
};
export type WorkOrderUpdateManyWithWhereWithoutEquipmentInput = {
    where: Prisma.WorkOrderScalarWhereInput;
    data: Prisma.XOR<Prisma.WorkOrderUpdateManyMutationInput, Prisma.WorkOrderUncheckedUpdateManyWithoutEquipmentInput>;
};
export type WorkOrderCreateWithoutMaintenanceRequestInput = {
    workOrderNumber: string;
    status?: $Enums.WorkOrderStatus;
    assignedAt?: Date | string | null;
    startedAt?: Date | string | null;
    completedAt?: Date | string | null;
    closedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    equipment: Prisma.EquipmentCreateNestedOneWithoutWorkOrdersInput;
    maintenanceOccurrence?: Prisma.MaintenanceOccurrenceCreateNestedOneWithoutLinkedWorkOrderInput;
    assignedTechnician?: Prisma.UserCreateNestedOneWithoutAssignedWorkOrdersInput;
    assignedBy?: Prisma.UserCreateNestedOneWithoutCreatedWorkOrdersInput;
};
export type WorkOrderUncheckedCreateWithoutMaintenanceRequestInput = {
    id?: number;
    workOrderNumber: string;
    equipmentId: number;
    status?: $Enums.WorkOrderStatus;
    maintenanceOccurrenceId?: number | null;
    assignedTechnicianId?: number | null;
    assignedById?: number | null;
    assignedAt?: Date | string | null;
    startedAt?: Date | string | null;
    completedAt?: Date | string | null;
    closedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type WorkOrderCreateOrConnectWithoutMaintenanceRequestInput = {
    where: Prisma.WorkOrderWhereUniqueInput;
    create: Prisma.XOR<Prisma.WorkOrderCreateWithoutMaintenanceRequestInput, Prisma.WorkOrderUncheckedCreateWithoutMaintenanceRequestInput>;
};
export type WorkOrderUpsertWithoutMaintenanceRequestInput = {
    update: Prisma.XOR<Prisma.WorkOrderUpdateWithoutMaintenanceRequestInput, Prisma.WorkOrderUncheckedUpdateWithoutMaintenanceRequestInput>;
    create: Prisma.XOR<Prisma.WorkOrderCreateWithoutMaintenanceRequestInput, Prisma.WorkOrderUncheckedCreateWithoutMaintenanceRequestInput>;
    where?: Prisma.WorkOrderWhereInput;
};
export type WorkOrderUpdateToOneWithWhereWithoutMaintenanceRequestInput = {
    where?: Prisma.WorkOrderWhereInput;
    data: Prisma.XOR<Prisma.WorkOrderUpdateWithoutMaintenanceRequestInput, Prisma.WorkOrderUncheckedUpdateWithoutMaintenanceRequestInput>;
};
export type WorkOrderUpdateWithoutMaintenanceRequestInput = {
    workOrderNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumWorkOrderStatusFieldUpdateOperationsInput | $Enums.WorkOrderStatus;
    assignedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    closedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    equipment?: Prisma.EquipmentUpdateOneRequiredWithoutWorkOrdersNestedInput;
    maintenanceOccurrence?: Prisma.MaintenanceOccurrenceUpdateOneWithoutLinkedWorkOrderNestedInput;
    assignedTechnician?: Prisma.UserUpdateOneWithoutAssignedWorkOrdersNestedInput;
    assignedBy?: Prisma.UserUpdateOneWithoutCreatedWorkOrdersNestedInput;
};
export type WorkOrderUncheckedUpdateWithoutMaintenanceRequestInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    workOrderNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    equipmentId?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumWorkOrderStatusFieldUpdateOperationsInput | $Enums.WorkOrderStatus;
    maintenanceOccurrenceId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    assignedTechnicianId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    assignedById?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    assignedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    closedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type WorkOrderCreateWithoutMaintenanceOccurrenceInput = {
    workOrderNumber: string;
    status?: $Enums.WorkOrderStatus;
    assignedAt?: Date | string | null;
    startedAt?: Date | string | null;
    completedAt?: Date | string | null;
    closedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    maintenanceRequest: Prisma.MaintenanceRequestCreateNestedOneWithoutWorkOrderInput;
    equipment: Prisma.EquipmentCreateNestedOneWithoutWorkOrdersInput;
    assignedTechnician?: Prisma.UserCreateNestedOneWithoutAssignedWorkOrdersInput;
    assignedBy?: Prisma.UserCreateNestedOneWithoutCreatedWorkOrdersInput;
};
export type WorkOrderUncheckedCreateWithoutMaintenanceOccurrenceInput = {
    id?: number;
    workOrderNumber: string;
    maintenanceRequestId: number;
    equipmentId: number;
    status?: $Enums.WorkOrderStatus;
    assignedTechnicianId?: number | null;
    assignedById?: number | null;
    assignedAt?: Date | string | null;
    startedAt?: Date | string | null;
    completedAt?: Date | string | null;
    closedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type WorkOrderCreateOrConnectWithoutMaintenanceOccurrenceInput = {
    where: Prisma.WorkOrderWhereUniqueInput;
    create: Prisma.XOR<Prisma.WorkOrderCreateWithoutMaintenanceOccurrenceInput, Prisma.WorkOrderUncheckedCreateWithoutMaintenanceOccurrenceInput>;
};
export type WorkOrderCreateManyMaintenanceOccurrenceInputEnvelope = {
    data: Prisma.WorkOrderCreateManyMaintenanceOccurrenceInput | Prisma.WorkOrderCreateManyMaintenanceOccurrenceInput[];
    skipDuplicates?: boolean;
};
export type WorkOrderUpsertWithWhereUniqueWithoutMaintenanceOccurrenceInput = {
    where: Prisma.WorkOrderWhereUniqueInput;
    update: Prisma.XOR<Prisma.WorkOrderUpdateWithoutMaintenanceOccurrenceInput, Prisma.WorkOrderUncheckedUpdateWithoutMaintenanceOccurrenceInput>;
    create: Prisma.XOR<Prisma.WorkOrderCreateWithoutMaintenanceOccurrenceInput, Prisma.WorkOrderUncheckedCreateWithoutMaintenanceOccurrenceInput>;
};
export type WorkOrderUpdateWithWhereUniqueWithoutMaintenanceOccurrenceInput = {
    where: Prisma.WorkOrderWhereUniqueInput;
    data: Prisma.XOR<Prisma.WorkOrderUpdateWithoutMaintenanceOccurrenceInput, Prisma.WorkOrderUncheckedUpdateWithoutMaintenanceOccurrenceInput>;
};
export type WorkOrderUpdateManyWithWhereWithoutMaintenanceOccurrenceInput = {
    where: Prisma.WorkOrderScalarWhereInput;
    data: Prisma.XOR<Prisma.WorkOrderUpdateManyMutationInput, Prisma.WorkOrderUncheckedUpdateManyWithoutMaintenanceOccurrenceInput>;
};
export type WorkOrderCreateManyAssignedTechnicianInput = {
    id?: number;
    workOrderNumber: string;
    maintenanceRequestId: number;
    equipmentId: number;
    status?: $Enums.WorkOrderStatus;
    maintenanceOccurrenceId?: number | null;
    assignedById?: number | null;
    assignedAt?: Date | string | null;
    startedAt?: Date | string | null;
    completedAt?: Date | string | null;
    closedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type WorkOrderCreateManyAssignedByInput = {
    id?: number;
    workOrderNumber: string;
    maintenanceRequestId: number;
    equipmentId: number;
    status?: $Enums.WorkOrderStatus;
    maintenanceOccurrenceId?: number | null;
    assignedTechnicianId?: number | null;
    assignedAt?: Date | string | null;
    startedAt?: Date | string | null;
    completedAt?: Date | string | null;
    closedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type WorkOrderUpdateWithoutAssignedTechnicianInput = {
    workOrderNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumWorkOrderStatusFieldUpdateOperationsInput | $Enums.WorkOrderStatus;
    assignedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    closedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    maintenanceRequest?: Prisma.MaintenanceRequestUpdateOneRequiredWithoutWorkOrderNestedInput;
    equipment?: Prisma.EquipmentUpdateOneRequiredWithoutWorkOrdersNestedInput;
    maintenanceOccurrence?: Prisma.MaintenanceOccurrenceUpdateOneWithoutLinkedWorkOrderNestedInput;
    assignedBy?: Prisma.UserUpdateOneWithoutCreatedWorkOrdersNestedInput;
};
export type WorkOrderUncheckedUpdateWithoutAssignedTechnicianInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    workOrderNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    maintenanceRequestId?: Prisma.IntFieldUpdateOperationsInput | number;
    equipmentId?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumWorkOrderStatusFieldUpdateOperationsInput | $Enums.WorkOrderStatus;
    maintenanceOccurrenceId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    assignedById?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    assignedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    closedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type WorkOrderUncheckedUpdateManyWithoutAssignedTechnicianInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    workOrderNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    maintenanceRequestId?: Prisma.IntFieldUpdateOperationsInput | number;
    equipmentId?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumWorkOrderStatusFieldUpdateOperationsInput | $Enums.WorkOrderStatus;
    maintenanceOccurrenceId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    assignedById?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    assignedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    closedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type WorkOrderUpdateWithoutAssignedByInput = {
    workOrderNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumWorkOrderStatusFieldUpdateOperationsInput | $Enums.WorkOrderStatus;
    assignedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    closedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    maintenanceRequest?: Prisma.MaintenanceRequestUpdateOneRequiredWithoutWorkOrderNestedInput;
    equipment?: Prisma.EquipmentUpdateOneRequiredWithoutWorkOrdersNestedInput;
    maintenanceOccurrence?: Prisma.MaintenanceOccurrenceUpdateOneWithoutLinkedWorkOrderNestedInput;
    assignedTechnician?: Prisma.UserUpdateOneWithoutAssignedWorkOrdersNestedInput;
};
export type WorkOrderUncheckedUpdateWithoutAssignedByInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    workOrderNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    maintenanceRequestId?: Prisma.IntFieldUpdateOperationsInput | number;
    equipmentId?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumWorkOrderStatusFieldUpdateOperationsInput | $Enums.WorkOrderStatus;
    maintenanceOccurrenceId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    assignedTechnicianId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    assignedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    closedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type WorkOrderUncheckedUpdateManyWithoutAssignedByInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    workOrderNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    maintenanceRequestId?: Prisma.IntFieldUpdateOperationsInput | number;
    equipmentId?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumWorkOrderStatusFieldUpdateOperationsInput | $Enums.WorkOrderStatus;
    maintenanceOccurrenceId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    assignedTechnicianId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    assignedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    closedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type WorkOrderCreateManyEquipmentInput = {
    id?: number;
    workOrderNumber: string;
    maintenanceRequestId: number;
    status?: $Enums.WorkOrderStatus;
    maintenanceOccurrenceId?: number | null;
    assignedTechnicianId?: number | null;
    assignedById?: number | null;
    assignedAt?: Date | string | null;
    startedAt?: Date | string | null;
    completedAt?: Date | string | null;
    closedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type WorkOrderUpdateWithoutEquipmentInput = {
    workOrderNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumWorkOrderStatusFieldUpdateOperationsInput | $Enums.WorkOrderStatus;
    assignedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    closedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    maintenanceRequest?: Prisma.MaintenanceRequestUpdateOneRequiredWithoutWorkOrderNestedInput;
    maintenanceOccurrence?: Prisma.MaintenanceOccurrenceUpdateOneWithoutLinkedWorkOrderNestedInput;
    assignedTechnician?: Prisma.UserUpdateOneWithoutAssignedWorkOrdersNestedInput;
    assignedBy?: Prisma.UserUpdateOneWithoutCreatedWorkOrdersNestedInput;
};
export type WorkOrderUncheckedUpdateWithoutEquipmentInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    workOrderNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    maintenanceRequestId?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumWorkOrderStatusFieldUpdateOperationsInput | $Enums.WorkOrderStatus;
    maintenanceOccurrenceId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    assignedTechnicianId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    assignedById?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    assignedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    closedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type WorkOrderUncheckedUpdateManyWithoutEquipmentInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    workOrderNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    maintenanceRequestId?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumWorkOrderStatusFieldUpdateOperationsInput | $Enums.WorkOrderStatus;
    maintenanceOccurrenceId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    assignedTechnicianId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    assignedById?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    assignedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    closedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type WorkOrderCreateManyMaintenanceOccurrenceInput = {
    id?: number;
    workOrderNumber: string;
    maintenanceRequestId: number;
    equipmentId: number;
    status?: $Enums.WorkOrderStatus;
    assignedTechnicianId?: number | null;
    assignedById?: number | null;
    assignedAt?: Date | string | null;
    startedAt?: Date | string | null;
    completedAt?: Date | string | null;
    closedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type WorkOrderUpdateWithoutMaintenanceOccurrenceInput = {
    workOrderNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumWorkOrderStatusFieldUpdateOperationsInput | $Enums.WorkOrderStatus;
    assignedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    closedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    maintenanceRequest?: Prisma.MaintenanceRequestUpdateOneRequiredWithoutWorkOrderNestedInput;
    equipment?: Prisma.EquipmentUpdateOneRequiredWithoutWorkOrdersNestedInput;
    assignedTechnician?: Prisma.UserUpdateOneWithoutAssignedWorkOrdersNestedInput;
    assignedBy?: Prisma.UserUpdateOneWithoutCreatedWorkOrdersNestedInput;
};
export type WorkOrderUncheckedUpdateWithoutMaintenanceOccurrenceInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    workOrderNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    maintenanceRequestId?: Prisma.IntFieldUpdateOperationsInput | number;
    equipmentId?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumWorkOrderStatusFieldUpdateOperationsInput | $Enums.WorkOrderStatus;
    assignedTechnicianId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    assignedById?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    assignedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    closedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type WorkOrderUncheckedUpdateManyWithoutMaintenanceOccurrenceInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    workOrderNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    maintenanceRequestId?: Prisma.IntFieldUpdateOperationsInput | number;
    equipmentId?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumWorkOrderStatusFieldUpdateOperationsInput | $Enums.WorkOrderStatus;
    assignedTechnicianId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    assignedById?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    assignedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    closedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type WorkOrderSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    workOrderNumber?: boolean;
    maintenanceRequestId?: boolean;
    equipmentId?: boolean;
    status?: boolean;
    maintenanceOccurrenceId?: boolean;
    assignedTechnicianId?: boolean;
    assignedById?: boolean;
    assignedAt?: boolean;
    startedAt?: boolean;
    completedAt?: boolean;
    closedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    maintenanceRequest?: boolean | Prisma.MaintenanceRequestDefaultArgs<ExtArgs>;
    equipment?: boolean | Prisma.EquipmentDefaultArgs<ExtArgs>;
    maintenanceOccurrence?: boolean | Prisma.WorkOrder$maintenanceOccurrenceArgs<ExtArgs>;
    assignedTechnician?: boolean | Prisma.WorkOrder$assignedTechnicianArgs<ExtArgs>;
    assignedBy?: boolean | Prisma.WorkOrder$assignedByArgs<ExtArgs>;
}, ExtArgs["result"]["workOrder"]>;
export type WorkOrderSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    workOrderNumber?: boolean;
    maintenanceRequestId?: boolean;
    equipmentId?: boolean;
    status?: boolean;
    maintenanceOccurrenceId?: boolean;
    assignedTechnicianId?: boolean;
    assignedById?: boolean;
    assignedAt?: boolean;
    startedAt?: boolean;
    completedAt?: boolean;
    closedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    maintenanceRequest?: boolean | Prisma.MaintenanceRequestDefaultArgs<ExtArgs>;
    equipment?: boolean | Prisma.EquipmentDefaultArgs<ExtArgs>;
    maintenanceOccurrence?: boolean | Prisma.WorkOrder$maintenanceOccurrenceArgs<ExtArgs>;
    assignedTechnician?: boolean | Prisma.WorkOrder$assignedTechnicianArgs<ExtArgs>;
    assignedBy?: boolean | Prisma.WorkOrder$assignedByArgs<ExtArgs>;
}, ExtArgs["result"]["workOrder"]>;
export type WorkOrderSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    workOrderNumber?: boolean;
    maintenanceRequestId?: boolean;
    equipmentId?: boolean;
    status?: boolean;
    maintenanceOccurrenceId?: boolean;
    assignedTechnicianId?: boolean;
    assignedById?: boolean;
    assignedAt?: boolean;
    startedAt?: boolean;
    completedAt?: boolean;
    closedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    maintenanceRequest?: boolean | Prisma.MaintenanceRequestDefaultArgs<ExtArgs>;
    equipment?: boolean | Prisma.EquipmentDefaultArgs<ExtArgs>;
    maintenanceOccurrence?: boolean | Prisma.WorkOrder$maintenanceOccurrenceArgs<ExtArgs>;
    assignedTechnician?: boolean | Prisma.WorkOrder$assignedTechnicianArgs<ExtArgs>;
    assignedBy?: boolean | Prisma.WorkOrder$assignedByArgs<ExtArgs>;
}, ExtArgs["result"]["workOrder"]>;
export type WorkOrderSelectScalar = {
    id?: boolean;
    workOrderNumber?: boolean;
    maintenanceRequestId?: boolean;
    equipmentId?: boolean;
    status?: boolean;
    maintenanceOccurrenceId?: boolean;
    assignedTechnicianId?: boolean;
    assignedById?: boolean;
    assignedAt?: boolean;
    startedAt?: boolean;
    completedAt?: boolean;
    closedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type WorkOrderOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "workOrderNumber" | "maintenanceRequestId" | "equipmentId" | "status" | "maintenanceOccurrenceId" | "assignedTechnicianId" | "assignedById" | "assignedAt" | "startedAt" | "completedAt" | "closedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["workOrder"]>;
export type WorkOrderInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    maintenanceRequest?: boolean | Prisma.MaintenanceRequestDefaultArgs<ExtArgs>;
    equipment?: boolean | Prisma.EquipmentDefaultArgs<ExtArgs>;
    maintenanceOccurrence?: boolean | Prisma.WorkOrder$maintenanceOccurrenceArgs<ExtArgs>;
    assignedTechnician?: boolean | Prisma.WorkOrder$assignedTechnicianArgs<ExtArgs>;
    assignedBy?: boolean | Prisma.WorkOrder$assignedByArgs<ExtArgs>;
};
export type WorkOrderIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    maintenanceRequest?: boolean | Prisma.MaintenanceRequestDefaultArgs<ExtArgs>;
    equipment?: boolean | Prisma.EquipmentDefaultArgs<ExtArgs>;
    maintenanceOccurrence?: boolean | Prisma.WorkOrder$maintenanceOccurrenceArgs<ExtArgs>;
    assignedTechnician?: boolean | Prisma.WorkOrder$assignedTechnicianArgs<ExtArgs>;
    assignedBy?: boolean | Prisma.WorkOrder$assignedByArgs<ExtArgs>;
};
export type WorkOrderIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    maintenanceRequest?: boolean | Prisma.MaintenanceRequestDefaultArgs<ExtArgs>;
    equipment?: boolean | Prisma.EquipmentDefaultArgs<ExtArgs>;
    maintenanceOccurrence?: boolean | Prisma.WorkOrder$maintenanceOccurrenceArgs<ExtArgs>;
    assignedTechnician?: boolean | Prisma.WorkOrder$assignedTechnicianArgs<ExtArgs>;
    assignedBy?: boolean | Prisma.WorkOrder$assignedByArgs<ExtArgs>;
};
export type $WorkOrderPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "WorkOrder";
    objects: {
        maintenanceRequest: Prisma.$MaintenanceRequestPayload<ExtArgs>;
        equipment: Prisma.$EquipmentPayload<ExtArgs>;
        maintenanceOccurrence: Prisma.$MaintenanceOccurrencePayload<ExtArgs> | null;
        assignedTechnician: Prisma.$UserPayload<ExtArgs> | null;
        assignedBy: Prisma.$UserPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        workOrderNumber: string;
        maintenanceRequestId: number;
        equipmentId: number;
        status: $Enums.WorkOrderStatus;
        maintenanceOccurrenceId: number | null;
        assignedTechnicianId: number | null;
        assignedById: number | null;
        assignedAt: Date | null;
        startedAt: Date | null;
        completedAt: Date | null;
        closedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["workOrder"]>;
    composites: {};
};
export type WorkOrderGetPayload<S extends boolean | null | undefined | WorkOrderDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$WorkOrderPayload, S>;
export type WorkOrderCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<WorkOrderFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: WorkOrderCountAggregateInputType | true;
};
export interface WorkOrderDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['WorkOrder'];
        meta: {
            name: 'WorkOrder';
        };
    };
    /**
     * Find zero or one WorkOrder that matches the filter.
     * @param {WorkOrderFindUniqueArgs} args - Arguments to find a WorkOrder
     * @example
     * // Get one WorkOrder
     * const workOrder = await prisma.workOrder.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WorkOrderFindUniqueArgs>(args: Prisma.SelectSubset<T, WorkOrderFindUniqueArgs<ExtArgs>>): Prisma.Prisma__WorkOrderClient<runtime.Types.Result.GetResult<Prisma.$WorkOrderPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one WorkOrder that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WorkOrderFindUniqueOrThrowArgs} args - Arguments to find a WorkOrder
     * @example
     * // Get one WorkOrder
     * const workOrder = await prisma.workOrder.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WorkOrderFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, WorkOrderFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__WorkOrderClient<runtime.Types.Result.GetResult<Prisma.$WorkOrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first WorkOrder that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkOrderFindFirstArgs} args - Arguments to find a WorkOrder
     * @example
     * // Get one WorkOrder
     * const workOrder = await prisma.workOrder.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WorkOrderFindFirstArgs>(args?: Prisma.SelectSubset<T, WorkOrderFindFirstArgs<ExtArgs>>): Prisma.Prisma__WorkOrderClient<runtime.Types.Result.GetResult<Prisma.$WorkOrderPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first WorkOrder that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkOrderFindFirstOrThrowArgs} args - Arguments to find a WorkOrder
     * @example
     * // Get one WorkOrder
     * const workOrder = await prisma.workOrder.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WorkOrderFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, WorkOrderFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__WorkOrderClient<runtime.Types.Result.GetResult<Prisma.$WorkOrderPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more WorkOrders that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkOrderFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WorkOrders
     * const workOrders = await prisma.workOrder.findMany()
     *
     * // Get first 10 WorkOrders
     * const workOrders = await prisma.workOrder.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const workOrderWithIdOnly = await prisma.workOrder.findMany({ select: { id: true } })
     *
     */
    findMany<T extends WorkOrderFindManyArgs>(args?: Prisma.SelectSubset<T, WorkOrderFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WorkOrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a WorkOrder.
     * @param {WorkOrderCreateArgs} args - Arguments to create a WorkOrder.
     * @example
     * // Create one WorkOrder
     * const WorkOrder = await prisma.workOrder.create({
     *   data: {
     *     // ... data to create a WorkOrder
     *   }
     * })
     *
     */
    create<T extends WorkOrderCreateArgs>(args: Prisma.SelectSubset<T, WorkOrderCreateArgs<ExtArgs>>): Prisma.Prisma__WorkOrderClient<runtime.Types.Result.GetResult<Prisma.$WorkOrderPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many WorkOrders.
     * @param {WorkOrderCreateManyArgs} args - Arguments to create many WorkOrders.
     * @example
     * // Create many WorkOrders
     * const workOrder = await prisma.workOrder.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends WorkOrderCreateManyArgs>(args?: Prisma.SelectSubset<T, WorkOrderCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many WorkOrders and returns the data saved in the database.
     * @param {WorkOrderCreateManyAndReturnArgs} args - Arguments to create many WorkOrders.
     * @example
     * // Create many WorkOrders
     * const workOrder = await prisma.workOrder.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many WorkOrders and only return the `id`
     * const workOrderWithIdOnly = await prisma.workOrder.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends WorkOrderCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, WorkOrderCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WorkOrderPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a WorkOrder.
     * @param {WorkOrderDeleteArgs} args - Arguments to delete one WorkOrder.
     * @example
     * // Delete one WorkOrder
     * const WorkOrder = await prisma.workOrder.delete({
     *   where: {
     *     // ... filter to delete one WorkOrder
     *   }
     * })
     *
     */
    delete<T extends WorkOrderDeleteArgs>(args: Prisma.SelectSubset<T, WorkOrderDeleteArgs<ExtArgs>>): Prisma.Prisma__WorkOrderClient<runtime.Types.Result.GetResult<Prisma.$WorkOrderPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one WorkOrder.
     * @param {WorkOrderUpdateArgs} args - Arguments to update one WorkOrder.
     * @example
     * // Update one WorkOrder
     * const workOrder = await prisma.workOrder.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends WorkOrderUpdateArgs>(args: Prisma.SelectSubset<T, WorkOrderUpdateArgs<ExtArgs>>): Prisma.Prisma__WorkOrderClient<runtime.Types.Result.GetResult<Prisma.$WorkOrderPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more WorkOrders.
     * @param {WorkOrderDeleteManyArgs} args - Arguments to filter WorkOrders to delete.
     * @example
     * // Delete a few WorkOrders
     * const { count } = await prisma.workOrder.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends WorkOrderDeleteManyArgs>(args?: Prisma.SelectSubset<T, WorkOrderDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more WorkOrders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkOrderUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WorkOrders
     * const workOrder = await prisma.workOrder.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends WorkOrderUpdateManyArgs>(args: Prisma.SelectSubset<T, WorkOrderUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more WorkOrders and returns the data updated in the database.
     * @param {WorkOrderUpdateManyAndReturnArgs} args - Arguments to update many WorkOrders.
     * @example
     * // Update many WorkOrders
     * const workOrder = await prisma.workOrder.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more WorkOrders and only return the `id`
     * const workOrderWithIdOnly = await prisma.workOrder.updateManyAndReturn({
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
    updateManyAndReturn<T extends WorkOrderUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, WorkOrderUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WorkOrderPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one WorkOrder.
     * @param {WorkOrderUpsertArgs} args - Arguments to update or create a WorkOrder.
     * @example
     * // Update or create a WorkOrder
     * const workOrder = await prisma.workOrder.upsert({
     *   create: {
     *     // ... data to create a WorkOrder
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WorkOrder we want to update
     *   }
     * })
     */
    upsert<T extends WorkOrderUpsertArgs>(args: Prisma.SelectSubset<T, WorkOrderUpsertArgs<ExtArgs>>): Prisma.Prisma__WorkOrderClient<runtime.Types.Result.GetResult<Prisma.$WorkOrderPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of WorkOrders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkOrderCountArgs} args - Arguments to filter WorkOrders to count.
     * @example
     * // Count the number of WorkOrders
     * const count = await prisma.workOrder.count({
     *   where: {
     *     // ... the filter for the WorkOrders we want to count
     *   }
     * })
    **/
    count<T extends WorkOrderCountArgs>(args?: Prisma.Subset<T, WorkOrderCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], WorkOrderCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a WorkOrder.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkOrderAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends WorkOrderAggregateArgs>(args: Prisma.Subset<T, WorkOrderAggregateArgs>): Prisma.PrismaPromise<GetWorkOrderAggregateType<T>>;
    /**
     * Group by WorkOrder.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkOrderGroupByArgs} args - Group by arguments.
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
    groupBy<T extends WorkOrderGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: WorkOrderGroupByArgs['orderBy'];
    } : {
        orderBy?: WorkOrderGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, WorkOrderGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWorkOrderGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the WorkOrder model
     */
    readonly fields: WorkOrderFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for WorkOrder.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__WorkOrderClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    maintenanceRequest<T extends Prisma.MaintenanceRequestDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.MaintenanceRequestDefaultArgs<ExtArgs>>): Prisma.Prisma__MaintenanceRequestClient<runtime.Types.Result.GetResult<Prisma.$MaintenanceRequestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    equipment<T extends Prisma.EquipmentDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.EquipmentDefaultArgs<ExtArgs>>): Prisma.Prisma__EquipmentClient<runtime.Types.Result.GetResult<Prisma.$EquipmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    maintenanceOccurrence<T extends Prisma.WorkOrder$maintenanceOccurrenceArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.WorkOrder$maintenanceOccurrenceArgs<ExtArgs>>): Prisma.Prisma__MaintenanceOccurrenceClient<runtime.Types.Result.GetResult<Prisma.$MaintenanceOccurrencePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    assignedTechnician<T extends Prisma.WorkOrder$assignedTechnicianArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.WorkOrder$assignedTechnicianArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    assignedBy<T extends Prisma.WorkOrder$assignedByArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.WorkOrder$assignedByArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the WorkOrder model
 */
export interface WorkOrderFieldRefs {
    readonly id: Prisma.FieldRef<"WorkOrder", 'Int'>;
    readonly workOrderNumber: Prisma.FieldRef<"WorkOrder", 'String'>;
    readonly maintenanceRequestId: Prisma.FieldRef<"WorkOrder", 'Int'>;
    readonly equipmentId: Prisma.FieldRef<"WorkOrder", 'Int'>;
    readonly status: Prisma.FieldRef<"WorkOrder", 'WorkOrderStatus'>;
    readonly maintenanceOccurrenceId: Prisma.FieldRef<"WorkOrder", 'Int'>;
    readonly assignedTechnicianId: Prisma.FieldRef<"WorkOrder", 'Int'>;
    readonly assignedById: Prisma.FieldRef<"WorkOrder", 'Int'>;
    readonly assignedAt: Prisma.FieldRef<"WorkOrder", 'DateTime'>;
    readonly startedAt: Prisma.FieldRef<"WorkOrder", 'DateTime'>;
    readonly completedAt: Prisma.FieldRef<"WorkOrder", 'DateTime'>;
    readonly closedAt: Prisma.FieldRef<"WorkOrder", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"WorkOrder", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"WorkOrder", 'DateTime'>;
}
/**
 * WorkOrder findUnique
 */
export type WorkOrderFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which WorkOrder to fetch.
     */
    where: Prisma.WorkOrderWhereUniqueInput;
};
/**
 * WorkOrder findUniqueOrThrow
 */
export type WorkOrderFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which WorkOrder to fetch.
     */
    where: Prisma.WorkOrderWhereUniqueInput;
};
/**
 * WorkOrder findFirst
 */
export type WorkOrderFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which WorkOrder to fetch.
     */
    where?: Prisma.WorkOrderWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of WorkOrders to fetch.
     */
    orderBy?: Prisma.WorkOrderOrderByWithRelationInput | Prisma.WorkOrderOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for WorkOrders.
     */
    cursor?: Prisma.WorkOrderWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` WorkOrders from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` WorkOrders.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of WorkOrders.
     */
    distinct?: Prisma.WorkOrderScalarFieldEnum | Prisma.WorkOrderScalarFieldEnum[];
};
/**
 * WorkOrder findFirstOrThrow
 */
export type WorkOrderFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which WorkOrder to fetch.
     */
    where?: Prisma.WorkOrderWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of WorkOrders to fetch.
     */
    orderBy?: Prisma.WorkOrderOrderByWithRelationInput | Prisma.WorkOrderOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for WorkOrders.
     */
    cursor?: Prisma.WorkOrderWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` WorkOrders from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` WorkOrders.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of WorkOrders.
     */
    distinct?: Prisma.WorkOrderScalarFieldEnum | Prisma.WorkOrderScalarFieldEnum[];
};
/**
 * WorkOrder findMany
 */
export type WorkOrderFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which WorkOrders to fetch.
     */
    where?: Prisma.WorkOrderWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of WorkOrders to fetch.
     */
    orderBy?: Prisma.WorkOrderOrderByWithRelationInput | Prisma.WorkOrderOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing WorkOrders.
     */
    cursor?: Prisma.WorkOrderWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` WorkOrders from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` WorkOrders.
     */
    skip?: number;
    distinct?: Prisma.WorkOrderScalarFieldEnum | Prisma.WorkOrderScalarFieldEnum[];
};
/**
 * WorkOrder create
 */
export type WorkOrderCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to create a WorkOrder.
     */
    data: Prisma.XOR<Prisma.WorkOrderCreateInput, Prisma.WorkOrderUncheckedCreateInput>;
};
/**
 * WorkOrder createMany
 */
export type WorkOrderCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many WorkOrders.
     */
    data: Prisma.WorkOrderCreateManyInput | Prisma.WorkOrderCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * WorkOrder createManyAndReturn
 */
export type WorkOrderCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkOrder
     */
    select?: Prisma.WorkOrderSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the WorkOrder
     */
    omit?: Prisma.WorkOrderOmit<ExtArgs> | null;
    /**
     * The data used to create many WorkOrders.
     */
    data: Prisma.WorkOrderCreateManyInput | Prisma.WorkOrderCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.WorkOrderIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * WorkOrder update
 */
export type WorkOrderUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to update a WorkOrder.
     */
    data: Prisma.XOR<Prisma.WorkOrderUpdateInput, Prisma.WorkOrderUncheckedUpdateInput>;
    /**
     * Choose, which WorkOrder to update.
     */
    where: Prisma.WorkOrderWhereUniqueInput;
};
/**
 * WorkOrder updateMany
 */
export type WorkOrderUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update WorkOrders.
     */
    data: Prisma.XOR<Prisma.WorkOrderUpdateManyMutationInput, Prisma.WorkOrderUncheckedUpdateManyInput>;
    /**
     * Filter which WorkOrders to update
     */
    where?: Prisma.WorkOrderWhereInput;
    /**
     * Limit how many WorkOrders to update.
     */
    limit?: number;
};
/**
 * WorkOrder updateManyAndReturn
 */
export type WorkOrderUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkOrder
     */
    select?: Prisma.WorkOrderSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the WorkOrder
     */
    omit?: Prisma.WorkOrderOmit<ExtArgs> | null;
    /**
     * The data used to update WorkOrders.
     */
    data: Prisma.XOR<Prisma.WorkOrderUpdateManyMutationInput, Prisma.WorkOrderUncheckedUpdateManyInput>;
    /**
     * Filter which WorkOrders to update
     */
    where?: Prisma.WorkOrderWhereInput;
    /**
     * Limit how many WorkOrders to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.WorkOrderIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * WorkOrder upsert
 */
export type WorkOrderUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The filter to search for the WorkOrder to update in case it exists.
     */
    where: Prisma.WorkOrderWhereUniqueInput;
    /**
     * In case the WorkOrder found by the `where` argument doesn't exist, create a new WorkOrder with this data.
     */
    create: Prisma.XOR<Prisma.WorkOrderCreateInput, Prisma.WorkOrderUncheckedCreateInput>;
    /**
     * In case the WorkOrder was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.WorkOrderUpdateInput, Prisma.WorkOrderUncheckedUpdateInput>;
};
/**
 * WorkOrder delete
 */
export type WorkOrderDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter which WorkOrder to delete.
     */
    where: Prisma.WorkOrderWhereUniqueInput;
};
/**
 * WorkOrder deleteMany
 */
export type WorkOrderDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which WorkOrders to delete
     */
    where?: Prisma.WorkOrderWhereInput;
    /**
     * Limit how many WorkOrders to delete.
     */
    limit?: number;
};
/**
 * WorkOrder.maintenanceOccurrence
 */
export type WorkOrder$maintenanceOccurrenceArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    where?: Prisma.MaintenanceOccurrenceWhereInput;
};
/**
 * WorkOrder.assignedTechnician
 */
export type WorkOrder$assignedTechnicianArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * WorkOrder.assignedBy
 */
export type WorkOrder$assignedByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * WorkOrder without action
 */
export type WorkOrderDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
};
export {};
//# sourceMappingURL=WorkOrder.d.ts.map