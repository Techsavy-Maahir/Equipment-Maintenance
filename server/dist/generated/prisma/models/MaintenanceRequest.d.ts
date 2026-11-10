import type * as runtime from "@prisma/client/runtime/library";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model MaintenanceRequest
 *
 */
export type MaintenanceRequestModel = runtime.Types.Result.DefaultSelection<Prisma.$MaintenanceRequestPayload>;
export type AggregateMaintenanceRequest = {
    _count: MaintenanceRequestCountAggregateOutputType | null;
    _avg: MaintenanceRequestAvgAggregateOutputType | null;
    _sum: MaintenanceRequestSumAggregateOutputType | null;
    _min: MaintenanceRequestMinAggregateOutputType | null;
    _max: MaintenanceRequestMaxAggregateOutputType | null;
};
export type MaintenanceRequestAvgAggregateOutputType = {
    id: number | null;
    equipmentId: number | null;
    requesterId: number | null;
    reviewerId: number | null;
};
export type MaintenanceRequestSumAggregateOutputType = {
    id: number | null;
    equipmentId: number | null;
    requesterId: number | null;
    reviewerId: number | null;
};
export type MaintenanceRequestMinAggregateOutputType = {
    id: number | null;
    requestType: $Enums.MaintenanceRequestType | null;
    status: $Enums.MaintenanceRequestStatus | null;
    equipmentId: number | null;
    requesterId: number | null;
    description: string | null;
    criticality: $Enums.Criticality | null;
    reviewerId: number | null;
    decisionReason: string | null;
    problem: string | null;
    proposedSolution: string | null;
    expectedBenefit: string | null;
    outcome: string | null;
    implementationStatus: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type MaintenanceRequestMaxAggregateOutputType = {
    id: number | null;
    requestType: $Enums.MaintenanceRequestType | null;
    status: $Enums.MaintenanceRequestStatus | null;
    equipmentId: number | null;
    requesterId: number | null;
    description: string | null;
    criticality: $Enums.Criticality | null;
    reviewerId: number | null;
    decisionReason: string | null;
    problem: string | null;
    proposedSolution: string | null;
    expectedBenefit: string | null;
    outcome: string | null;
    implementationStatus: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type MaintenanceRequestCountAggregateOutputType = {
    id: number;
    requestType: number;
    status: number;
    equipmentId: number;
    requesterId: number;
    description: number;
    criticality: number;
    reviewerId: number;
    decisionReason: number;
    problem: number;
    proposedSolution: number;
    expectedBenefit: number;
    outcome: number;
    implementationStatus: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type MaintenanceRequestAvgAggregateInputType = {
    id?: true;
    equipmentId?: true;
    requesterId?: true;
    reviewerId?: true;
};
export type MaintenanceRequestSumAggregateInputType = {
    id?: true;
    equipmentId?: true;
    requesterId?: true;
    reviewerId?: true;
};
export type MaintenanceRequestMinAggregateInputType = {
    id?: true;
    requestType?: true;
    status?: true;
    equipmentId?: true;
    requesterId?: true;
    description?: true;
    criticality?: true;
    reviewerId?: true;
    decisionReason?: true;
    problem?: true;
    proposedSolution?: true;
    expectedBenefit?: true;
    outcome?: true;
    implementationStatus?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type MaintenanceRequestMaxAggregateInputType = {
    id?: true;
    requestType?: true;
    status?: true;
    equipmentId?: true;
    requesterId?: true;
    description?: true;
    criticality?: true;
    reviewerId?: true;
    decisionReason?: true;
    problem?: true;
    proposedSolution?: true;
    expectedBenefit?: true;
    outcome?: true;
    implementationStatus?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type MaintenanceRequestCountAggregateInputType = {
    id?: true;
    requestType?: true;
    status?: true;
    equipmentId?: true;
    requesterId?: true;
    description?: true;
    criticality?: true;
    reviewerId?: true;
    decisionReason?: true;
    problem?: true;
    proposedSolution?: true;
    expectedBenefit?: true;
    outcome?: true;
    implementationStatus?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type MaintenanceRequestAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which MaintenanceRequest to aggregate.
     */
    where?: Prisma.MaintenanceRequestWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of MaintenanceRequests to fetch.
     */
    orderBy?: Prisma.MaintenanceRequestOrderByWithRelationInput | Prisma.MaintenanceRequestOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.MaintenanceRequestWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` MaintenanceRequests from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` MaintenanceRequests.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned MaintenanceRequests
    **/
    _count?: true | MaintenanceRequestCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: MaintenanceRequestAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: MaintenanceRequestSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: MaintenanceRequestMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: MaintenanceRequestMaxAggregateInputType;
};
export type GetMaintenanceRequestAggregateType<T extends MaintenanceRequestAggregateArgs> = {
    [P in keyof T & keyof AggregateMaintenanceRequest]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateMaintenanceRequest[P]> : Prisma.GetScalarType<T[P], AggregateMaintenanceRequest[P]>;
};
export type MaintenanceRequestGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MaintenanceRequestWhereInput;
    orderBy?: Prisma.MaintenanceRequestOrderByWithAggregationInput | Prisma.MaintenanceRequestOrderByWithAggregationInput[];
    by: Prisma.MaintenanceRequestScalarFieldEnum[] | Prisma.MaintenanceRequestScalarFieldEnum;
    having?: Prisma.MaintenanceRequestScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: MaintenanceRequestCountAggregateInputType | true;
    _avg?: MaintenanceRequestAvgAggregateInputType;
    _sum?: MaintenanceRequestSumAggregateInputType;
    _min?: MaintenanceRequestMinAggregateInputType;
    _max?: MaintenanceRequestMaxAggregateInputType;
};
export type MaintenanceRequestGroupByOutputType = {
    id: number;
    requestType: $Enums.MaintenanceRequestType;
    status: $Enums.MaintenanceRequestStatus;
    equipmentId: number;
    requesterId: number;
    description: string;
    criticality: $Enums.Criticality;
    reviewerId: number | null;
    decisionReason: string | null;
    problem: string | null;
    proposedSolution: string | null;
    expectedBenefit: string | null;
    outcome: string | null;
    implementationStatus: string | null;
    createdAt: Date;
    updatedAt: Date;
    _count: MaintenanceRequestCountAggregateOutputType | null;
    _avg: MaintenanceRequestAvgAggregateOutputType | null;
    _sum: MaintenanceRequestSumAggregateOutputType | null;
    _min: MaintenanceRequestMinAggregateOutputType | null;
    _max: MaintenanceRequestMaxAggregateOutputType | null;
};
type GetMaintenanceRequestGroupByPayload<T extends MaintenanceRequestGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<MaintenanceRequestGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof MaintenanceRequestGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], MaintenanceRequestGroupByOutputType[P]> : Prisma.GetScalarType<T[P], MaintenanceRequestGroupByOutputType[P]>;
}>>;
export type MaintenanceRequestWhereInput = {
    AND?: Prisma.MaintenanceRequestWhereInput | Prisma.MaintenanceRequestWhereInput[];
    OR?: Prisma.MaintenanceRequestWhereInput[];
    NOT?: Prisma.MaintenanceRequestWhereInput | Prisma.MaintenanceRequestWhereInput[];
    id?: Prisma.IntFilter<"MaintenanceRequest"> | number;
    requestType?: Prisma.EnumMaintenanceRequestTypeFilter<"MaintenanceRequest"> | $Enums.MaintenanceRequestType;
    status?: Prisma.EnumMaintenanceRequestStatusFilter<"MaintenanceRequest"> | $Enums.MaintenanceRequestStatus;
    equipmentId?: Prisma.IntFilter<"MaintenanceRequest"> | number;
    requesterId?: Prisma.IntFilter<"MaintenanceRequest"> | number;
    description?: Prisma.StringFilter<"MaintenanceRequest"> | string;
    criticality?: Prisma.EnumCriticalityFilter<"MaintenanceRequest"> | $Enums.Criticality;
    reviewerId?: Prisma.IntNullableFilter<"MaintenanceRequest"> | number | null;
    decisionReason?: Prisma.StringNullableFilter<"MaintenanceRequest"> | string | null;
    problem?: Prisma.StringNullableFilter<"MaintenanceRequest"> | string | null;
    proposedSolution?: Prisma.StringNullableFilter<"MaintenanceRequest"> | string | null;
    expectedBenefit?: Prisma.StringNullableFilter<"MaintenanceRequest"> | string | null;
    outcome?: Prisma.StringNullableFilter<"MaintenanceRequest"> | string | null;
    implementationStatus?: Prisma.StringNullableFilter<"MaintenanceRequest"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"MaintenanceRequest"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"MaintenanceRequest"> | Date | string;
    equipment?: Prisma.XOR<Prisma.EquipmentScalarRelationFilter, Prisma.EquipmentWhereInput>;
    requester?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    reviewer?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
    decisionHistory?: Prisma.DecisionHistoryListRelationFilter;
};
export type MaintenanceRequestOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    requestType?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    equipmentId?: Prisma.SortOrder;
    requesterId?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    criticality?: Prisma.SortOrder;
    reviewerId?: Prisma.SortOrderInput | Prisma.SortOrder;
    decisionReason?: Prisma.SortOrderInput | Prisma.SortOrder;
    problem?: Prisma.SortOrderInput | Prisma.SortOrder;
    proposedSolution?: Prisma.SortOrderInput | Prisma.SortOrder;
    expectedBenefit?: Prisma.SortOrderInput | Prisma.SortOrder;
    outcome?: Prisma.SortOrderInput | Prisma.SortOrder;
    implementationStatus?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    equipment?: Prisma.EquipmentOrderByWithRelationInput;
    requester?: Prisma.UserOrderByWithRelationInput;
    reviewer?: Prisma.UserOrderByWithRelationInput;
    decisionHistory?: Prisma.DecisionHistoryOrderByRelationAggregateInput;
};
export type MaintenanceRequestWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    AND?: Prisma.MaintenanceRequestWhereInput | Prisma.MaintenanceRequestWhereInput[];
    OR?: Prisma.MaintenanceRequestWhereInput[];
    NOT?: Prisma.MaintenanceRequestWhereInput | Prisma.MaintenanceRequestWhereInput[];
    requestType?: Prisma.EnumMaintenanceRequestTypeFilter<"MaintenanceRequest"> | $Enums.MaintenanceRequestType;
    status?: Prisma.EnumMaintenanceRequestStatusFilter<"MaintenanceRequest"> | $Enums.MaintenanceRequestStatus;
    equipmentId?: Prisma.IntFilter<"MaintenanceRequest"> | number;
    requesterId?: Prisma.IntFilter<"MaintenanceRequest"> | number;
    description?: Prisma.StringFilter<"MaintenanceRequest"> | string;
    criticality?: Prisma.EnumCriticalityFilter<"MaintenanceRequest"> | $Enums.Criticality;
    reviewerId?: Prisma.IntNullableFilter<"MaintenanceRequest"> | number | null;
    decisionReason?: Prisma.StringNullableFilter<"MaintenanceRequest"> | string | null;
    problem?: Prisma.StringNullableFilter<"MaintenanceRequest"> | string | null;
    proposedSolution?: Prisma.StringNullableFilter<"MaintenanceRequest"> | string | null;
    expectedBenefit?: Prisma.StringNullableFilter<"MaintenanceRequest"> | string | null;
    outcome?: Prisma.StringNullableFilter<"MaintenanceRequest"> | string | null;
    implementationStatus?: Prisma.StringNullableFilter<"MaintenanceRequest"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"MaintenanceRequest"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"MaintenanceRequest"> | Date | string;
    equipment?: Prisma.XOR<Prisma.EquipmentScalarRelationFilter, Prisma.EquipmentWhereInput>;
    requester?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    reviewer?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
    decisionHistory?: Prisma.DecisionHistoryListRelationFilter;
}, "id">;
export type MaintenanceRequestOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    requestType?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    equipmentId?: Prisma.SortOrder;
    requesterId?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    criticality?: Prisma.SortOrder;
    reviewerId?: Prisma.SortOrderInput | Prisma.SortOrder;
    decisionReason?: Prisma.SortOrderInput | Prisma.SortOrder;
    problem?: Prisma.SortOrderInput | Prisma.SortOrder;
    proposedSolution?: Prisma.SortOrderInput | Prisma.SortOrder;
    expectedBenefit?: Prisma.SortOrderInput | Prisma.SortOrder;
    outcome?: Prisma.SortOrderInput | Prisma.SortOrder;
    implementationStatus?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.MaintenanceRequestCountOrderByAggregateInput;
    _avg?: Prisma.MaintenanceRequestAvgOrderByAggregateInput;
    _max?: Prisma.MaintenanceRequestMaxOrderByAggregateInput;
    _min?: Prisma.MaintenanceRequestMinOrderByAggregateInput;
    _sum?: Prisma.MaintenanceRequestSumOrderByAggregateInput;
};
export type MaintenanceRequestScalarWhereWithAggregatesInput = {
    AND?: Prisma.MaintenanceRequestScalarWhereWithAggregatesInput | Prisma.MaintenanceRequestScalarWhereWithAggregatesInput[];
    OR?: Prisma.MaintenanceRequestScalarWhereWithAggregatesInput[];
    NOT?: Prisma.MaintenanceRequestScalarWhereWithAggregatesInput | Prisma.MaintenanceRequestScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"MaintenanceRequest"> | number;
    requestType?: Prisma.EnumMaintenanceRequestTypeWithAggregatesFilter<"MaintenanceRequest"> | $Enums.MaintenanceRequestType;
    status?: Prisma.EnumMaintenanceRequestStatusWithAggregatesFilter<"MaintenanceRequest"> | $Enums.MaintenanceRequestStatus;
    equipmentId?: Prisma.IntWithAggregatesFilter<"MaintenanceRequest"> | number;
    requesterId?: Prisma.IntWithAggregatesFilter<"MaintenanceRequest"> | number;
    description?: Prisma.StringWithAggregatesFilter<"MaintenanceRequest"> | string;
    criticality?: Prisma.EnumCriticalityWithAggregatesFilter<"MaintenanceRequest"> | $Enums.Criticality;
    reviewerId?: Prisma.IntNullableWithAggregatesFilter<"MaintenanceRequest"> | number | null;
    decisionReason?: Prisma.StringNullableWithAggregatesFilter<"MaintenanceRequest"> | string | null;
    problem?: Prisma.StringNullableWithAggregatesFilter<"MaintenanceRequest"> | string | null;
    proposedSolution?: Prisma.StringNullableWithAggregatesFilter<"MaintenanceRequest"> | string | null;
    expectedBenefit?: Prisma.StringNullableWithAggregatesFilter<"MaintenanceRequest"> | string | null;
    outcome?: Prisma.StringNullableWithAggregatesFilter<"MaintenanceRequest"> | string | null;
    implementationStatus?: Prisma.StringNullableWithAggregatesFilter<"MaintenanceRequest"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"MaintenanceRequest"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"MaintenanceRequest"> | Date | string;
};
export type MaintenanceRequestCreateInput = {
    requestType: $Enums.MaintenanceRequestType;
    status?: $Enums.MaintenanceRequestStatus;
    description: string;
    criticality: $Enums.Criticality;
    decisionReason?: string | null;
    problem?: string | null;
    proposedSolution?: string | null;
    expectedBenefit?: string | null;
    outcome?: string | null;
    implementationStatus?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    equipment: Prisma.EquipmentCreateNestedOneWithoutMaintenanceRequestsInput;
    requester: Prisma.UserCreateNestedOneWithoutRequestedMaintenanceRequestsInput;
    reviewer?: Prisma.UserCreateNestedOneWithoutReviewedMaintenanceRequestsInput;
    decisionHistory?: Prisma.DecisionHistoryCreateNestedManyWithoutRequestInput;
};
export type MaintenanceRequestUncheckedCreateInput = {
    id?: number;
    requestType: $Enums.MaintenanceRequestType;
    status?: $Enums.MaintenanceRequestStatus;
    equipmentId: number;
    requesterId: number;
    description: string;
    criticality: $Enums.Criticality;
    reviewerId?: number | null;
    decisionReason?: string | null;
    problem?: string | null;
    proposedSolution?: string | null;
    expectedBenefit?: string | null;
    outcome?: string | null;
    implementationStatus?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    decisionHistory?: Prisma.DecisionHistoryUncheckedCreateNestedManyWithoutRequestInput;
};
export type MaintenanceRequestUpdateInput = {
    requestType?: Prisma.EnumMaintenanceRequestTypeFieldUpdateOperationsInput | $Enums.MaintenanceRequestType;
    status?: Prisma.EnumMaintenanceRequestStatusFieldUpdateOperationsInput | $Enums.MaintenanceRequestStatus;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    criticality?: Prisma.EnumCriticalityFieldUpdateOperationsInput | $Enums.Criticality;
    decisionReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    problem?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    proposedSolution?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    expectedBenefit?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    outcome?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    implementationStatus?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    equipment?: Prisma.EquipmentUpdateOneRequiredWithoutMaintenanceRequestsNestedInput;
    requester?: Prisma.UserUpdateOneRequiredWithoutRequestedMaintenanceRequestsNestedInput;
    reviewer?: Prisma.UserUpdateOneWithoutReviewedMaintenanceRequestsNestedInput;
    decisionHistory?: Prisma.DecisionHistoryUpdateManyWithoutRequestNestedInput;
};
export type MaintenanceRequestUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    requestType?: Prisma.EnumMaintenanceRequestTypeFieldUpdateOperationsInput | $Enums.MaintenanceRequestType;
    status?: Prisma.EnumMaintenanceRequestStatusFieldUpdateOperationsInput | $Enums.MaintenanceRequestStatus;
    equipmentId?: Prisma.IntFieldUpdateOperationsInput | number;
    requesterId?: Prisma.IntFieldUpdateOperationsInput | number;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    criticality?: Prisma.EnumCriticalityFieldUpdateOperationsInput | $Enums.Criticality;
    reviewerId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    decisionReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    problem?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    proposedSolution?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    expectedBenefit?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    outcome?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    implementationStatus?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    decisionHistory?: Prisma.DecisionHistoryUncheckedUpdateManyWithoutRequestNestedInput;
};
export type MaintenanceRequestCreateManyInput = {
    id?: number;
    requestType: $Enums.MaintenanceRequestType;
    status?: $Enums.MaintenanceRequestStatus;
    equipmentId: number;
    requesterId: number;
    description: string;
    criticality: $Enums.Criticality;
    reviewerId?: number | null;
    decisionReason?: string | null;
    problem?: string | null;
    proposedSolution?: string | null;
    expectedBenefit?: string | null;
    outcome?: string | null;
    implementationStatus?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type MaintenanceRequestUpdateManyMutationInput = {
    requestType?: Prisma.EnumMaintenanceRequestTypeFieldUpdateOperationsInput | $Enums.MaintenanceRequestType;
    status?: Prisma.EnumMaintenanceRequestStatusFieldUpdateOperationsInput | $Enums.MaintenanceRequestStatus;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    criticality?: Prisma.EnumCriticalityFieldUpdateOperationsInput | $Enums.Criticality;
    decisionReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    problem?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    proposedSolution?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    expectedBenefit?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    outcome?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    implementationStatus?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MaintenanceRequestUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    requestType?: Prisma.EnumMaintenanceRequestTypeFieldUpdateOperationsInput | $Enums.MaintenanceRequestType;
    status?: Prisma.EnumMaintenanceRequestStatusFieldUpdateOperationsInput | $Enums.MaintenanceRequestStatus;
    equipmentId?: Prisma.IntFieldUpdateOperationsInput | number;
    requesterId?: Prisma.IntFieldUpdateOperationsInput | number;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    criticality?: Prisma.EnumCriticalityFieldUpdateOperationsInput | $Enums.Criticality;
    reviewerId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    decisionReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    problem?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    proposedSolution?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    expectedBenefit?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    outcome?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    implementationStatus?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MaintenanceRequestListRelationFilter = {
    every?: Prisma.MaintenanceRequestWhereInput;
    some?: Prisma.MaintenanceRequestWhereInput;
    none?: Prisma.MaintenanceRequestWhereInput;
};
export type MaintenanceRequestOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type MaintenanceRequestCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    requestType?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    equipmentId?: Prisma.SortOrder;
    requesterId?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    criticality?: Prisma.SortOrder;
    reviewerId?: Prisma.SortOrder;
    decisionReason?: Prisma.SortOrder;
    problem?: Prisma.SortOrder;
    proposedSolution?: Prisma.SortOrder;
    expectedBenefit?: Prisma.SortOrder;
    outcome?: Prisma.SortOrder;
    implementationStatus?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type MaintenanceRequestAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    equipmentId?: Prisma.SortOrder;
    requesterId?: Prisma.SortOrder;
    reviewerId?: Prisma.SortOrder;
};
export type MaintenanceRequestMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    requestType?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    equipmentId?: Prisma.SortOrder;
    requesterId?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    criticality?: Prisma.SortOrder;
    reviewerId?: Prisma.SortOrder;
    decisionReason?: Prisma.SortOrder;
    problem?: Prisma.SortOrder;
    proposedSolution?: Prisma.SortOrder;
    expectedBenefit?: Prisma.SortOrder;
    outcome?: Prisma.SortOrder;
    implementationStatus?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type MaintenanceRequestMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    requestType?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    equipmentId?: Prisma.SortOrder;
    requesterId?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    criticality?: Prisma.SortOrder;
    reviewerId?: Prisma.SortOrder;
    decisionReason?: Prisma.SortOrder;
    problem?: Prisma.SortOrder;
    proposedSolution?: Prisma.SortOrder;
    expectedBenefit?: Prisma.SortOrder;
    outcome?: Prisma.SortOrder;
    implementationStatus?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type MaintenanceRequestSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    equipmentId?: Prisma.SortOrder;
    requesterId?: Prisma.SortOrder;
    reviewerId?: Prisma.SortOrder;
};
export type MaintenanceRequestScalarRelationFilter = {
    is?: Prisma.MaintenanceRequestWhereInput;
    isNot?: Prisma.MaintenanceRequestWhereInput;
};
export type MaintenanceRequestCreateNestedManyWithoutRequesterInput = {
    create?: Prisma.XOR<Prisma.MaintenanceRequestCreateWithoutRequesterInput, Prisma.MaintenanceRequestUncheckedCreateWithoutRequesterInput> | Prisma.MaintenanceRequestCreateWithoutRequesterInput[] | Prisma.MaintenanceRequestUncheckedCreateWithoutRequesterInput[];
    connectOrCreate?: Prisma.MaintenanceRequestCreateOrConnectWithoutRequesterInput | Prisma.MaintenanceRequestCreateOrConnectWithoutRequesterInput[];
    createMany?: Prisma.MaintenanceRequestCreateManyRequesterInputEnvelope;
    connect?: Prisma.MaintenanceRequestWhereUniqueInput | Prisma.MaintenanceRequestWhereUniqueInput[];
};
export type MaintenanceRequestCreateNestedManyWithoutReviewerInput = {
    create?: Prisma.XOR<Prisma.MaintenanceRequestCreateWithoutReviewerInput, Prisma.MaintenanceRequestUncheckedCreateWithoutReviewerInput> | Prisma.MaintenanceRequestCreateWithoutReviewerInput[] | Prisma.MaintenanceRequestUncheckedCreateWithoutReviewerInput[];
    connectOrCreate?: Prisma.MaintenanceRequestCreateOrConnectWithoutReviewerInput | Prisma.MaintenanceRequestCreateOrConnectWithoutReviewerInput[];
    createMany?: Prisma.MaintenanceRequestCreateManyReviewerInputEnvelope;
    connect?: Prisma.MaintenanceRequestWhereUniqueInput | Prisma.MaintenanceRequestWhereUniqueInput[];
};
export type MaintenanceRequestUncheckedCreateNestedManyWithoutRequesterInput = {
    create?: Prisma.XOR<Prisma.MaintenanceRequestCreateWithoutRequesterInput, Prisma.MaintenanceRequestUncheckedCreateWithoutRequesterInput> | Prisma.MaintenanceRequestCreateWithoutRequesterInput[] | Prisma.MaintenanceRequestUncheckedCreateWithoutRequesterInput[];
    connectOrCreate?: Prisma.MaintenanceRequestCreateOrConnectWithoutRequesterInput | Prisma.MaintenanceRequestCreateOrConnectWithoutRequesterInput[];
    createMany?: Prisma.MaintenanceRequestCreateManyRequesterInputEnvelope;
    connect?: Prisma.MaintenanceRequestWhereUniqueInput | Prisma.MaintenanceRequestWhereUniqueInput[];
};
export type MaintenanceRequestUncheckedCreateNestedManyWithoutReviewerInput = {
    create?: Prisma.XOR<Prisma.MaintenanceRequestCreateWithoutReviewerInput, Prisma.MaintenanceRequestUncheckedCreateWithoutReviewerInput> | Prisma.MaintenanceRequestCreateWithoutReviewerInput[] | Prisma.MaintenanceRequestUncheckedCreateWithoutReviewerInput[];
    connectOrCreate?: Prisma.MaintenanceRequestCreateOrConnectWithoutReviewerInput | Prisma.MaintenanceRequestCreateOrConnectWithoutReviewerInput[];
    createMany?: Prisma.MaintenanceRequestCreateManyReviewerInputEnvelope;
    connect?: Prisma.MaintenanceRequestWhereUniqueInput | Prisma.MaintenanceRequestWhereUniqueInput[];
};
export type MaintenanceRequestUpdateManyWithoutRequesterNestedInput = {
    create?: Prisma.XOR<Prisma.MaintenanceRequestCreateWithoutRequesterInput, Prisma.MaintenanceRequestUncheckedCreateWithoutRequesterInput> | Prisma.MaintenanceRequestCreateWithoutRequesterInput[] | Prisma.MaintenanceRequestUncheckedCreateWithoutRequesterInput[];
    connectOrCreate?: Prisma.MaintenanceRequestCreateOrConnectWithoutRequesterInput | Prisma.MaintenanceRequestCreateOrConnectWithoutRequesterInput[];
    upsert?: Prisma.MaintenanceRequestUpsertWithWhereUniqueWithoutRequesterInput | Prisma.MaintenanceRequestUpsertWithWhereUniqueWithoutRequesterInput[];
    createMany?: Prisma.MaintenanceRequestCreateManyRequesterInputEnvelope;
    set?: Prisma.MaintenanceRequestWhereUniqueInput | Prisma.MaintenanceRequestWhereUniqueInput[];
    disconnect?: Prisma.MaintenanceRequestWhereUniqueInput | Prisma.MaintenanceRequestWhereUniqueInput[];
    delete?: Prisma.MaintenanceRequestWhereUniqueInput | Prisma.MaintenanceRequestWhereUniqueInput[];
    connect?: Prisma.MaintenanceRequestWhereUniqueInput | Prisma.MaintenanceRequestWhereUniqueInput[];
    update?: Prisma.MaintenanceRequestUpdateWithWhereUniqueWithoutRequesterInput | Prisma.MaintenanceRequestUpdateWithWhereUniqueWithoutRequesterInput[];
    updateMany?: Prisma.MaintenanceRequestUpdateManyWithWhereWithoutRequesterInput | Prisma.MaintenanceRequestUpdateManyWithWhereWithoutRequesterInput[];
    deleteMany?: Prisma.MaintenanceRequestScalarWhereInput | Prisma.MaintenanceRequestScalarWhereInput[];
};
export type MaintenanceRequestUpdateManyWithoutReviewerNestedInput = {
    create?: Prisma.XOR<Prisma.MaintenanceRequestCreateWithoutReviewerInput, Prisma.MaintenanceRequestUncheckedCreateWithoutReviewerInput> | Prisma.MaintenanceRequestCreateWithoutReviewerInput[] | Prisma.MaintenanceRequestUncheckedCreateWithoutReviewerInput[];
    connectOrCreate?: Prisma.MaintenanceRequestCreateOrConnectWithoutReviewerInput | Prisma.MaintenanceRequestCreateOrConnectWithoutReviewerInput[];
    upsert?: Prisma.MaintenanceRequestUpsertWithWhereUniqueWithoutReviewerInput | Prisma.MaintenanceRequestUpsertWithWhereUniqueWithoutReviewerInput[];
    createMany?: Prisma.MaintenanceRequestCreateManyReviewerInputEnvelope;
    set?: Prisma.MaintenanceRequestWhereUniqueInput | Prisma.MaintenanceRequestWhereUniqueInput[];
    disconnect?: Prisma.MaintenanceRequestWhereUniqueInput | Prisma.MaintenanceRequestWhereUniqueInput[];
    delete?: Prisma.MaintenanceRequestWhereUniqueInput | Prisma.MaintenanceRequestWhereUniqueInput[];
    connect?: Prisma.MaintenanceRequestWhereUniqueInput | Prisma.MaintenanceRequestWhereUniqueInput[];
    update?: Prisma.MaintenanceRequestUpdateWithWhereUniqueWithoutReviewerInput | Prisma.MaintenanceRequestUpdateWithWhereUniqueWithoutReviewerInput[];
    updateMany?: Prisma.MaintenanceRequestUpdateManyWithWhereWithoutReviewerInput | Prisma.MaintenanceRequestUpdateManyWithWhereWithoutReviewerInput[];
    deleteMany?: Prisma.MaintenanceRequestScalarWhereInput | Prisma.MaintenanceRequestScalarWhereInput[];
};
export type MaintenanceRequestUncheckedUpdateManyWithoutRequesterNestedInput = {
    create?: Prisma.XOR<Prisma.MaintenanceRequestCreateWithoutRequesterInput, Prisma.MaintenanceRequestUncheckedCreateWithoutRequesterInput> | Prisma.MaintenanceRequestCreateWithoutRequesterInput[] | Prisma.MaintenanceRequestUncheckedCreateWithoutRequesterInput[];
    connectOrCreate?: Prisma.MaintenanceRequestCreateOrConnectWithoutRequesterInput | Prisma.MaintenanceRequestCreateOrConnectWithoutRequesterInput[];
    upsert?: Prisma.MaintenanceRequestUpsertWithWhereUniqueWithoutRequesterInput | Prisma.MaintenanceRequestUpsertWithWhereUniqueWithoutRequesterInput[];
    createMany?: Prisma.MaintenanceRequestCreateManyRequesterInputEnvelope;
    set?: Prisma.MaintenanceRequestWhereUniqueInput | Prisma.MaintenanceRequestWhereUniqueInput[];
    disconnect?: Prisma.MaintenanceRequestWhereUniqueInput | Prisma.MaintenanceRequestWhereUniqueInput[];
    delete?: Prisma.MaintenanceRequestWhereUniqueInput | Prisma.MaintenanceRequestWhereUniqueInput[];
    connect?: Prisma.MaintenanceRequestWhereUniqueInput | Prisma.MaintenanceRequestWhereUniqueInput[];
    update?: Prisma.MaintenanceRequestUpdateWithWhereUniqueWithoutRequesterInput | Prisma.MaintenanceRequestUpdateWithWhereUniqueWithoutRequesterInput[];
    updateMany?: Prisma.MaintenanceRequestUpdateManyWithWhereWithoutRequesterInput | Prisma.MaintenanceRequestUpdateManyWithWhereWithoutRequesterInput[];
    deleteMany?: Prisma.MaintenanceRequestScalarWhereInput | Prisma.MaintenanceRequestScalarWhereInput[];
};
export type MaintenanceRequestUncheckedUpdateManyWithoutReviewerNestedInput = {
    create?: Prisma.XOR<Prisma.MaintenanceRequestCreateWithoutReviewerInput, Prisma.MaintenanceRequestUncheckedCreateWithoutReviewerInput> | Prisma.MaintenanceRequestCreateWithoutReviewerInput[] | Prisma.MaintenanceRequestUncheckedCreateWithoutReviewerInput[];
    connectOrCreate?: Prisma.MaintenanceRequestCreateOrConnectWithoutReviewerInput | Prisma.MaintenanceRequestCreateOrConnectWithoutReviewerInput[];
    upsert?: Prisma.MaintenanceRequestUpsertWithWhereUniqueWithoutReviewerInput | Prisma.MaintenanceRequestUpsertWithWhereUniqueWithoutReviewerInput[];
    createMany?: Prisma.MaintenanceRequestCreateManyReviewerInputEnvelope;
    set?: Prisma.MaintenanceRequestWhereUniqueInput | Prisma.MaintenanceRequestWhereUniqueInput[];
    disconnect?: Prisma.MaintenanceRequestWhereUniqueInput | Prisma.MaintenanceRequestWhereUniqueInput[];
    delete?: Prisma.MaintenanceRequestWhereUniqueInput | Prisma.MaintenanceRequestWhereUniqueInput[];
    connect?: Prisma.MaintenanceRequestWhereUniqueInput | Prisma.MaintenanceRequestWhereUniqueInput[];
    update?: Prisma.MaintenanceRequestUpdateWithWhereUniqueWithoutReviewerInput | Prisma.MaintenanceRequestUpdateWithWhereUniqueWithoutReviewerInput[];
    updateMany?: Prisma.MaintenanceRequestUpdateManyWithWhereWithoutReviewerInput | Prisma.MaintenanceRequestUpdateManyWithWhereWithoutReviewerInput[];
    deleteMany?: Prisma.MaintenanceRequestScalarWhereInput | Prisma.MaintenanceRequestScalarWhereInput[];
};
export type MaintenanceRequestCreateNestedManyWithoutEquipmentInput = {
    create?: Prisma.XOR<Prisma.MaintenanceRequestCreateWithoutEquipmentInput, Prisma.MaintenanceRequestUncheckedCreateWithoutEquipmentInput> | Prisma.MaintenanceRequestCreateWithoutEquipmentInput[] | Prisma.MaintenanceRequestUncheckedCreateWithoutEquipmentInput[];
    connectOrCreate?: Prisma.MaintenanceRequestCreateOrConnectWithoutEquipmentInput | Prisma.MaintenanceRequestCreateOrConnectWithoutEquipmentInput[];
    createMany?: Prisma.MaintenanceRequestCreateManyEquipmentInputEnvelope;
    connect?: Prisma.MaintenanceRequestWhereUniqueInput | Prisma.MaintenanceRequestWhereUniqueInput[];
};
export type MaintenanceRequestUncheckedCreateNestedManyWithoutEquipmentInput = {
    create?: Prisma.XOR<Prisma.MaintenanceRequestCreateWithoutEquipmentInput, Prisma.MaintenanceRequestUncheckedCreateWithoutEquipmentInput> | Prisma.MaintenanceRequestCreateWithoutEquipmentInput[] | Prisma.MaintenanceRequestUncheckedCreateWithoutEquipmentInput[];
    connectOrCreate?: Prisma.MaintenanceRequestCreateOrConnectWithoutEquipmentInput | Prisma.MaintenanceRequestCreateOrConnectWithoutEquipmentInput[];
    createMany?: Prisma.MaintenanceRequestCreateManyEquipmentInputEnvelope;
    connect?: Prisma.MaintenanceRequestWhereUniqueInput | Prisma.MaintenanceRequestWhereUniqueInput[];
};
export type MaintenanceRequestUpdateManyWithoutEquipmentNestedInput = {
    create?: Prisma.XOR<Prisma.MaintenanceRequestCreateWithoutEquipmentInput, Prisma.MaintenanceRequestUncheckedCreateWithoutEquipmentInput> | Prisma.MaintenanceRequestCreateWithoutEquipmentInput[] | Prisma.MaintenanceRequestUncheckedCreateWithoutEquipmentInput[];
    connectOrCreate?: Prisma.MaintenanceRequestCreateOrConnectWithoutEquipmentInput | Prisma.MaintenanceRequestCreateOrConnectWithoutEquipmentInput[];
    upsert?: Prisma.MaintenanceRequestUpsertWithWhereUniqueWithoutEquipmentInput | Prisma.MaintenanceRequestUpsertWithWhereUniqueWithoutEquipmentInput[];
    createMany?: Prisma.MaintenanceRequestCreateManyEquipmentInputEnvelope;
    set?: Prisma.MaintenanceRequestWhereUniqueInput | Prisma.MaintenanceRequestWhereUniqueInput[];
    disconnect?: Prisma.MaintenanceRequestWhereUniqueInput | Prisma.MaintenanceRequestWhereUniqueInput[];
    delete?: Prisma.MaintenanceRequestWhereUniqueInput | Prisma.MaintenanceRequestWhereUniqueInput[];
    connect?: Prisma.MaintenanceRequestWhereUniqueInput | Prisma.MaintenanceRequestWhereUniqueInput[];
    update?: Prisma.MaintenanceRequestUpdateWithWhereUniqueWithoutEquipmentInput | Prisma.MaintenanceRequestUpdateWithWhereUniqueWithoutEquipmentInput[];
    updateMany?: Prisma.MaintenanceRequestUpdateManyWithWhereWithoutEquipmentInput | Prisma.MaintenanceRequestUpdateManyWithWhereWithoutEquipmentInput[];
    deleteMany?: Prisma.MaintenanceRequestScalarWhereInput | Prisma.MaintenanceRequestScalarWhereInput[];
};
export type MaintenanceRequestUncheckedUpdateManyWithoutEquipmentNestedInput = {
    create?: Prisma.XOR<Prisma.MaintenanceRequestCreateWithoutEquipmentInput, Prisma.MaintenanceRequestUncheckedCreateWithoutEquipmentInput> | Prisma.MaintenanceRequestCreateWithoutEquipmentInput[] | Prisma.MaintenanceRequestUncheckedCreateWithoutEquipmentInput[];
    connectOrCreate?: Prisma.MaintenanceRequestCreateOrConnectWithoutEquipmentInput | Prisma.MaintenanceRequestCreateOrConnectWithoutEquipmentInput[];
    upsert?: Prisma.MaintenanceRequestUpsertWithWhereUniqueWithoutEquipmentInput | Prisma.MaintenanceRequestUpsertWithWhereUniqueWithoutEquipmentInput[];
    createMany?: Prisma.MaintenanceRequestCreateManyEquipmentInputEnvelope;
    set?: Prisma.MaintenanceRequestWhereUniqueInput | Prisma.MaintenanceRequestWhereUniqueInput[];
    disconnect?: Prisma.MaintenanceRequestWhereUniqueInput | Prisma.MaintenanceRequestWhereUniqueInput[];
    delete?: Prisma.MaintenanceRequestWhereUniqueInput | Prisma.MaintenanceRequestWhereUniqueInput[];
    connect?: Prisma.MaintenanceRequestWhereUniqueInput | Prisma.MaintenanceRequestWhereUniqueInput[];
    update?: Prisma.MaintenanceRequestUpdateWithWhereUniqueWithoutEquipmentInput | Prisma.MaintenanceRequestUpdateWithWhereUniqueWithoutEquipmentInput[];
    updateMany?: Prisma.MaintenanceRequestUpdateManyWithWhereWithoutEquipmentInput | Prisma.MaintenanceRequestUpdateManyWithWhereWithoutEquipmentInput[];
    deleteMany?: Prisma.MaintenanceRequestScalarWhereInput | Prisma.MaintenanceRequestScalarWhereInput[];
};
export type EnumMaintenanceRequestTypeFieldUpdateOperationsInput = {
    set?: $Enums.MaintenanceRequestType;
};
export type EnumMaintenanceRequestStatusFieldUpdateOperationsInput = {
    set?: $Enums.MaintenanceRequestStatus;
};
export type MaintenanceRequestCreateNestedOneWithoutDecisionHistoryInput = {
    create?: Prisma.XOR<Prisma.MaintenanceRequestCreateWithoutDecisionHistoryInput, Prisma.MaintenanceRequestUncheckedCreateWithoutDecisionHistoryInput>;
    connectOrCreate?: Prisma.MaintenanceRequestCreateOrConnectWithoutDecisionHistoryInput;
    connect?: Prisma.MaintenanceRequestWhereUniqueInput;
};
export type MaintenanceRequestUpdateOneRequiredWithoutDecisionHistoryNestedInput = {
    create?: Prisma.XOR<Prisma.MaintenanceRequestCreateWithoutDecisionHistoryInput, Prisma.MaintenanceRequestUncheckedCreateWithoutDecisionHistoryInput>;
    connectOrCreate?: Prisma.MaintenanceRequestCreateOrConnectWithoutDecisionHistoryInput;
    upsert?: Prisma.MaintenanceRequestUpsertWithoutDecisionHistoryInput;
    connect?: Prisma.MaintenanceRequestWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.MaintenanceRequestUpdateToOneWithWhereWithoutDecisionHistoryInput, Prisma.MaintenanceRequestUpdateWithoutDecisionHistoryInput>, Prisma.MaintenanceRequestUncheckedUpdateWithoutDecisionHistoryInput>;
};
export type MaintenanceRequestCreateWithoutRequesterInput = {
    requestType: $Enums.MaintenanceRequestType;
    status?: $Enums.MaintenanceRequestStatus;
    description: string;
    criticality: $Enums.Criticality;
    decisionReason?: string | null;
    problem?: string | null;
    proposedSolution?: string | null;
    expectedBenefit?: string | null;
    outcome?: string | null;
    implementationStatus?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    equipment: Prisma.EquipmentCreateNestedOneWithoutMaintenanceRequestsInput;
    reviewer?: Prisma.UserCreateNestedOneWithoutReviewedMaintenanceRequestsInput;
    decisionHistory?: Prisma.DecisionHistoryCreateNestedManyWithoutRequestInput;
};
export type MaintenanceRequestUncheckedCreateWithoutRequesterInput = {
    id?: number;
    requestType: $Enums.MaintenanceRequestType;
    status?: $Enums.MaintenanceRequestStatus;
    equipmentId: number;
    description: string;
    criticality: $Enums.Criticality;
    reviewerId?: number | null;
    decisionReason?: string | null;
    problem?: string | null;
    proposedSolution?: string | null;
    expectedBenefit?: string | null;
    outcome?: string | null;
    implementationStatus?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    decisionHistory?: Prisma.DecisionHistoryUncheckedCreateNestedManyWithoutRequestInput;
};
export type MaintenanceRequestCreateOrConnectWithoutRequesterInput = {
    where: Prisma.MaintenanceRequestWhereUniqueInput;
    create: Prisma.XOR<Prisma.MaintenanceRequestCreateWithoutRequesterInput, Prisma.MaintenanceRequestUncheckedCreateWithoutRequesterInput>;
};
export type MaintenanceRequestCreateManyRequesterInputEnvelope = {
    data: Prisma.MaintenanceRequestCreateManyRequesterInput | Prisma.MaintenanceRequestCreateManyRequesterInput[];
    skipDuplicates?: boolean;
};
export type MaintenanceRequestCreateWithoutReviewerInput = {
    requestType: $Enums.MaintenanceRequestType;
    status?: $Enums.MaintenanceRequestStatus;
    description: string;
    criticality: $Enums.Criticality;
    decisionReason?: string | null;
    problem?: string | null;
    proposedSolution?: string | null;
    expectedBenefit?: string | null;
    outcome?: string | null;
    implementationStatus?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    equipment: Prisma.EquipmentCreateNestedOneWithoutMaintenanceRequestsInput;
    requester: Prisma.UserCreateNestedOneWithoutRequestedMaintenanceRequestsInput;
    decisionHistory?: Prisma.DecisionHistoryCreateNestedManyWithoutRequestInput;
};
export type MaintenanceRequestUncheckedCreateWithoutReviewerInput = {
    id?: number;
    requestType: $Enums.MaintenanceRequestType;
    status?: $Enums.MaintenanceRequestStatus;
    equipmentId: number;
    requesterId: number;
    description: string;
    criticality: $Enums.Criticality;
    decisionReason?: string | null;
    problem?: string | null;
    proposedSolution?: string | null;
    expectedBenefit?: string | null;
    outcome?: string | null;
    implementationStatus?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    decisionHistory?: Prisma.DecisionHistoryUncheckedCreateNestedManyWithoutRequestInput;
};
export type MaintenanceRequestCreateOrConnectWithoutReviewerInput = {
    where: Prisma.MaintenanceRequestWhereUniqueInput;
    create: Prisma.XOR<Prisma.MaintenanceRequestCreateWithoutReviewerInput, Prisma.MaintenanceRequestUncheckedCreateWithoutReviewerInput>;
};
export type MaintenanceRequestCreateManyReviewerInputEnvelope = {
    data: Prisma.MaintenanceRequestCreateManyReviewerInput | Prisma.MaintenanceRequestCreateManyReviewerInput[];
    skipDuplicates?: boolean;
};
export type MaintenanceRequestUpsertWithWhereUniqueWithoutRequesterInput = {
    where: Prisma.MaintenanceRequestWhereUniqueInput;
    update: Prisma.XOR<Prisma.MaintenanceRequestUpdateWithoutRequesterInput, Prisma.MaintenanceRequestUncheckedUpdateWithoutRequesterInput>;
    create: Prisma.XOR<Prisma.MaintenanceRequestCreateWithoutRequesterInput, Prisma.MaintenanceRequestUncheckedCreateWithoutRequesterInput>;
};
export type MaintenanceRequestUpdateWithWhereUniqueWithoutRequesterInput = {
    where: Prisma.MaintenanceRequestWhereUniqueInput;
    data: Prisma.XOR<Prisma.MaintenanceRequestUpdateWithoutRequesterInput, Prisma.MaintenanceRequestUncheckedUpdateWithoutRequesterInput>;
};
export type MaintenanceRequestUpdateManyWithWhereWithoutRequesterInput = {
    where: Prisma.MaintenanceRequestScalarWhereInput;
    data: Prisma.XOR<Prisma.MaintenanceRequestUpdateManyMutationInput, Prisma.MaintenanceRequestUncheckedUpdateManyWithoutRequesterInput>;
};
export type MaintenanceRequestScalarWhereInput = {
    AND?: Prisma.MaintenanceRequestScalarWhereInput | Prisma.MaintenanceRequestScalarWhereInput[];
    OR?: Prisma.MaintenanceRequestScalarWhereInput[];
    NOT?: Prisma.MaintenanceRequestScalarWhereInput | Prisma.MaintenanceRequestScalarWhereInput[];
    id?: Prisma.IntFilter<"MaintenanceRequest"> | number;
    requestType?: Prisma.EnumMaintenanceRequestTypeFilter<"MaintenanceRequest"> | $Enums.MaintenanceRequestType;
    status?: Prisma.EnumMaintenanceRequestStatusFilter<"MaintenanceRequest"> | $Enums.MaintenanceRequestStatus;
    equipmentId?: Prisma.IntFilter<"MaintenanceRequest"> | number;
    requesterId?: Prisma.IntFilter<"MaintenanceRequest"> | number;
    description?: Prisma.StringFilter<"MaintenanceRequest"> | string;
    criticality?: Prisma.EnumCriticalityFilter<"MaintenanceRequest"> | $Enums.Criticality;
    reviewerId?: Prisma.IntNullableFilter<"MaintenanceRequest"> | number | null;
    decisionReason?: Prisma.StringNullableFilter<"MaintenanceRequest"> | string | null;
    problem?: Prisma.StringNullableFilter<"MaintenanceRequest"> | string | null;
    proposedSolution?: Prisma.StringNullableFilter<"MaintenanceRequest"> | string | null;
    expectedBenefit?: Prisma.StringNullableFilter<"MaintenanceRequest"> | string | null;
    outcome?: Prisma.StringNullableFilter<"MaintenanceRequest"> | string | null;
    implementationStatus?: Prisma.StringNullableFilter<"MaintenanceRequest"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"MaintenanceRequest"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"MaintenanceRequest"> | Date | string;
};
export type MaintenanceRequestUpsertWithWhereUniqueWithoutReviewerInput = {
    where: Prisma.MaintenanceRequestWhereUniqueInput;
    update: Prisma.XOR<Prisma.MaintenanceRequestUpdateWithoutReviewerInput, Prisma.MaintenanceRequestUncheckedUpdateWithoutReviewerInput>;
    create: Prisma.XOR<Prisma.MaintenanceRequestCreateWithoutReviewerInput, Prisma.MaintenanceRequestUncheckedCreateWithoutReviewerInput>;
};
export type MaintenanceRequestUpdateWithWhereUniqueWithoutReviewerInput = {
    where: Prisma.MaintenanceRequestWhereUniqueInput;
    data: Prisma.XOR<Prisma.MaintenanceRequestUpdateWithoutReviewerInput, Prisma.MaintenanceRequestUncheckedUpdateWithoutReviewerInput>;
};
export type MaintenanceRequestUpdateManyWithWhereWithoutReviewerInput = {
    where: Prisma.MaintenanceRequestScalarWhereInput;
    data: Prisma.XOR<Prisma.MaintenanceRequestUpdateManyMutationInput, Prisma.MaintenanceRequestUncheckedUpdateManyWithoutReviewerInput>;
};
export type MaintenanceRequestCreateWithoutEquipmentInput = {
    requestType: $Enums.MaintenanceRequestType;
    status?: $Enums.MaintenanceRequestStatus;
    description: string;
    criticality: $Enums.Criticality;
    decisionReason?: string | null;
    problem?: string | null;
    proposedSolution?: string | null;
    expectedBenefit?: string | null;
    outcome?: string | null;
    implementationStatus?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    requester: Prisma.UserCreateNestedOneWithoutRequestedMaintenanceRequestsInput;
    reviewer?: Prisma.UserCreateNestedOneWithoutReviewedMaintenanceRequestsInput;
    decisionHistory?: Prisma.DecisionHistoryCreateNestedManyWithoutRequestInput;
};
export type MaintenanceRequestUncheckedCreateWithoutEquipmentInput = {
    id?: number;
    requestType: $Enums.MaintenanceRequestType;
    status?: $Enums.MaintenanceRequestStatus;
    requesterId: number;
    description: string;
    criticality: $Enums.Criticality;
    reviewerId?: number | null;
    decisionReason?: string | null;
    problem?: string | null;
    proposedSolution?: string | null;
    expectedBenefit?: string | null;
    outcome?: string | null;
    implementationStatus?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    decisionHistory?: Prisma.DecisionHistoryUncheckedCreateNestedManyWithoutRequestInput;
};
export type MaintenanceRequestCreateOrConnectWithoutEquipmentInput = {
    where: Prisma.MaintenanceRequestWhereUniqueInput;
    create: Prisma.XOR<Prisma.MaintenanceRequestCreateWithoutEquipmentInput, Prisma.MaintenanceRequestUncheckedCreateWithoutEquipmentInput>;
};
export type MaintenanceRequestCreateManyEquipmentInputEnvelope = {
    data: Prisma.MaintenanceRequestCreateManyEquipmentInput | Prisma.MaintenanceRequestCreateManyEquipmentInput[];
    skipDuplicates?: boolean;
};
export type MaintenanceRequestUpsertWithWhereUniqueWithoutEquipmentInput = {
    where: Prisma.MaintenanceRequestWhereUniqueInput;
    update: Prisma.XOR<Prisma.MaintenanceRequestUpdateWithoutEquipmentInput, Prisma.MaintenanceRequestUncheckedUpdateWithoutEquipmentInput>;
    create: Prisma.XOR<Prisma.MaintenanceRequestCreateWithoutEquipmentInput, Prisma.MaintenanceRequestUncheckedCreateWithoutEquipmentInput>;
};
export type MaintenanceRequestUpdateWithWhereUniqueWithoutEquipmentInput = {
    where: Prisma.MaintenanceRequestWhereUniqueInput;
    data: Prisma.XOR<Prisma.MaintenanceRequestUpdateWithoutEquipmentInput, Prisma.MaintenanceRequestUncheckedUpdateWithoutEquipmentInput>;
};
export type MaintenanceRequestUpdateManyWithWhereWithoutEquipmentInput = {
    where: Prisma.MaintenanceRequestScalarWhereInput;
    data: Prisma.XOR<Prisma.MaintenanceRequestUpdateManyMutationInput, Prisma.MaintenanceRequestUncheckedUpdateManyWithoutEquipmentInput>;
};
export type MaintenanceRequestCreateWithoutDecisionHistoryInput = {
    requestType: $Enums.MaintenanceRequestType;
    status?: $Enums.MaintenanceRequestStatus;
    description: string;
    criticality: $Enums.Criticality;
    decisionReason?: string | null;
    problem?: string | null;
    proposedSolution?: string | null;
    expectedBenefit?: string | null;
    outcome?: string | null;
    implementationStatus?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    equipment: Prisma.EquipmentCreateNestedOneWithoutMaintenanceRequestsInput;
    requester: Prisma.UserCreateNestedOneWithoutRequestedMaintenanceRequestsInput;
    reviewer?: Prisma.UserCreateNestedOneWithoutReviewedMaintenanceRequestsInput;
};
export type MaintenanceRequestUncheckedCreateWithoutDecisionHistoryInput = {
    id?: number;
    requestType: $Enums.MaintenanceRequestType;
    status?: $Enums.MaintenanceRequestStatus;
    equipmentId: number;
    requesterId: number;
    description: string;
    criticality: $Enums.Criticality;
    reviewerId?: number | null;
    decisionReason?: string | null;
    problem?: string | null;
    proposedSolution?: string | null;
    expectedBenefit?: string | null;
    outcome?: string | null;
    implementationStatus?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type MaintenanceRequestCreateOrConnectWithoutDecisionHistoryInput = {
    where: Prisma.MaintenanceRequestWhereUniqueInput;
    create: Prisma.XOR<Prisma.MaintenanceRequestCreateWithoutDecisionHistoryInput, Prisma.MaintenanceRequestUncheckedCreateWithoutDecisionHistoryInput>;
};
export type MaintenanceRequestUpsertWithoutDecisionHistoryInput = {
    update: Prisma.XOR<Prisma.MaintenanceRequestUpdateWithoutDecisionHistoryInput, Prisma.MaintenanceRequestUncheckedUpdateWithoutDecisionHistoryInput>;
    create: Prisma.XOR<Prisma.MaintenanceRequestCreateWithoutDecisionHistoryInput, Prisma.MaintenanceRequestUncheckedCreateWithoutDecisionHistoryInput>;
    where?: Prisma.MaintenanceRequestWhereInput;
};
export type MaintenanceRequestUpdateToOneWithWhereWithoutDecisionHistoryInput = {
    where?: Prisma.MaintenanceRequestWhereInput;
    data: Prisma.XOR<Prisma.MaintenanceRequestUpdateWithoutDecisionHistoryInput, Prisma.MaintenanceRequestUncheckedUpdateWithoutDecisionHistoryInput>;
};
export type MaintenanceRequestUpdateWithoutDecisionHistoryInput = {
    requestType?: Prisma.EnumMaintenanceRequestTypeFieldUpdateOperationsInput | $Enums.MaintenanceRequestType;
    status?: Prisma.EnumMaintenanceRequestStatusFieldUpdateOperationsInput | $Enums.MaintenanceRequestStatus;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    criticality?: Prisma.EnumCriticalityFieldUpdateOperationsInput | $Enums.Criticality;
    decisionReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    problem?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    proposedSolution?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    expectedBenefit?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    outcome?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    implementationStatus?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    equipment?: Prisma.EquipmentUpdateOneRequiredWithoutMaintenanceRequestsNestedInput;
    requester?: Prisma.UserUpdateOneRequiredWithoutRequestedMaintenanceRequestsNestedInput;
    reviewer?: Prisma.UserUpdateOneWithoutReviewedMaintenanceRequestsNestedInput;
};
export type MaintenanceRequestUncheckedUpdateWithoutDecisionHistoryInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    requestType?: Prisma.EnumMaintenanceRequestTypeFieldUpdateOperationsInput | $Enums.MaintenanceRequestType;
    status?: Prisma.EnumMaintenanceRequestStatusFieldUpdateOperationsInput | $Enums.MaintenanceRequestStatus;
    equipmentId?: Prisma.IntFieldUpdateOperationsInput | number;
    requesterId?: Prisma.IntFieldUpdateOperationsInput | number;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    criticality?: Prisma.EnumCriticalityFieldUpdateOperationsInput | $Enums.Criticality;
    reviewerId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    decisionReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    problem?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    proposedSolution?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    expectedBenefit?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    outcome?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    implementationStatus?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MaintenanceRequestCreateManyRequesterInput = {
    id?: number;
    requestType: $Enums.MaintenanceRequestType;
    status?: $Enums.MaintenanceRequestStatus;
    equipmentId: number;
    description: string;
    criticality: $Enums.Criticality;
    reviewerId?: number | null;
    decisionReason?: string | null;
    problem?: string | null;
    proposedSolution?: string | null;
    expectedBenefit?: string | null;
    outcome?: string | null;
    implementationStatus?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type MaintenanceRequestCreateManyReviewerInput = {
    id?: number;
    requestType: $Enums.MaintenanceRequestType;
    status?: $Enums.MaintenanceRequestStatus;
    equipmentId: number;
    requesterId: number;
    description: string;
    criticality: $Enums.Criticality;
    decisionReason?: string | null;
    problem?: string | null;
    proposedSolution?: string | null;
    expectedBenefit?: string | null;
    outcome?: string | null;
    implementationStatus?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type MaintenanceRequestUpdateWithoutRequesterInput = {
    requestType?: Prisma.EnumMaintenanceRequestTypeFieldUpdateOperationsInput | $Enums.MaintenanceRequestType;
    status?: Prisma.EnumMaintenanceRequestStatusFieldUpdateOperationsInput | $Enums.MaintenanceRequestStatus;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    criticality?: Prisma.EnumCriticalityFieldUpdateOperationsInput | $Enums.Criticality;
    decisionReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    problem?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    proposedSolution?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    expectedBenefit?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    outcome?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    implementationStatus?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    equipment?: Prisma.EquipmentUpdateOneRequiredWithoutMaintenanceRequestsNestedInput;
    reviewer?: Prisma.UserUpdateOneWithoutReviewedMaintenanceRequestsNestedInput;
    decisionHistory?: Prisma.DecisionHistoryUpdateManyWithoutRequestNestedInput;
};
export type MaintenanceRequestUncheckedUpdateWithoutRequesterInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    requestType?: Prisma.EnumMaintenanceRequestTypeFieldUpdateOperationsInput | $Enums.MaintenanceRequestType;
    status?: Prisma.EnumMaintenanceRequestStatusFieldUpdateOperationsInput | $Enums.MaintenanceRequestStatus;
    equipmentId?: Prisma.IntFieldUpdateOperationsInput | number;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    criticality?: Prisma.EnumCriticalityFieldUpdateOperationsInput | $Enums.Criticality;
    reviewerId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    decisionReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    problem?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    proposedSolution?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    expectedBenefit?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    outcome?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    implementationStatus?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    decisionHistory?: Prisma.DecisionHistoryUncheckedUpdateManyWithoutRequestNestedInput;
};
export type MaintenanceRequestUncheckedUpdateManyWithoutRequesterInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    requestType?: Prisma.EnumMaintenanceRequestTypeFieldUpdateOperationsInput | $Enums.MaintenanceRequestType;
    status?: Prisma.EnumMaintenanceRequestStatusFieldUpdateOperationsInput | $Enums.MaintenanceRequestStatus;
    equipmentId?: Prisma.IntFieldUpdateOperationsInput | number;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    criticality?: Prisma.EnumCriticalityFieldUpdateOperationsInput | $Enums.Criticality;
    reviewerId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    decisionReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    problem?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    proposedSolution?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    expectedBenefit?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    outcome?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    implementationStatus?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MaintenanceRequestUpdateWithoutReviewerInput = {
    requestType?: Prisma.EnumMaintenanceRequestTypeFieldUpdateOperationsInput | $Enums.MaintenanceRequestType;
    status?: Prisma.EnumMaintenanceRequestStatusFieldUpdateOperationsInput | $Enums.MaintenanceRequestStatus;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    criticality?: Prisma.EnumCriticalityFieldUpdateOperationsInput | $Enums.Criticality;
    decisionReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    problem?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    proposedSolution?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    expectedBenefit?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    outcome?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    implementationStatus?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    equipment?: Prisma.EquipmentUpdateOneRequiredWithoutMaintenanceRequestsNestedInput;
    requester?: Prisma.UserUpdateOneRequiredWithoutRequestedMaintenanceRequestsNestedInput;
    decisionHistory?: Prisma.DecisionHistoryUpdateManyWithoutRequestNestedInput;
};
export type MaintenanceRequestUncheckedUpdateWithoutReviewerInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    requestType?: Prisma.EnumMaintenanceRequestTypeFieldUpdateOperationsInput | $Enums.MaintenanceRequestType;
    status?: Prisma.EnumMaintenanceRequestStatusFieldUpdateOperationsInput | $Enums.MaintenanceRequestStatus;
    equipmentId?: Prisma.IntFieldUpdateOperationsInput | number;
    requesterId?: Prisma.IntFieldUpdateOperationsInput | number;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    criticality?: Prisma.EnumCriticalityFieldUpdateOperationsInput | $Enums.Criticality;
    decisionReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    problem?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    proposedSolution?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    expectedBenefit?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    outcome?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    implementationStatus?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    decisionHistory?: Prisma.DecisionHistoryUncheckedUpdateManyWithoutRequestNestedInput;
};
export type MaintenanceRequestUncheckedUpdateManyWithoutReviewerInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    requestType?: Prisma.EnumMaintenanceRequestTypeFieldUpdateOperationsInput | $Enums.MaintenanceRequestType;
    status?: Prisma.EnumMaintenanceRequestStatusFieldUpdateOperationsInput | $Enums.MaintenanceRequestStatus;
    equipmentId?: Prisma.IntFieldUpdateOperationsInput | number;
    requesterId?: Prisma.IntFieldUpdateOperationsInput | number;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    criticality?: Prisma.EnumCriticalityFieldUpdateOperationsInput | $Enums.Criticality;
    decisionReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    problem?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    proposedSolution?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    expectedBenefit?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    outcome?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    implementationStatus?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MaintenanceRequestCreateManyEquipmentInput = {
    id?: number;
    requestType: $Enums.MaintenanceRequestType;
    status?: $Enums.MaintenanceRequestStatus;
    requesterId: number;
    description: string;
    criticality: $Enums.Criticality;
    reviewerId?: number | null;
    decisionReason?: string | null;
    problem?: string | null;
    proposedSolution?: string | null;
    expectedBenefit?: string | null;
    outcome?: string | null;
    implementationStatus?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type MaintenanceRequestUpdateWithoutEquipmentInput = {
    requestType?: Prisma.EnumMaintenanceRequestTypeFieldUpdateOperationsInput | $Enums.MaintenanceRequestType;
    status?: Prisma.EnumMaintenanceRequestStatusFieldUpdateOperationsInput | $Enums.MaintenanceRequestStatus;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    criticality?: Prisma.EnumCriticalityFieldUpdateOperationsInput | $Enums.Criticality;
    decisionReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    problem?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    proposedSolution?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    expectedBenefit?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    outcome?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    implementationStatus?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    requester?: Prisma.UserUpdateOneRequiredWithoutRequestedMaintenanceRequestsNestedInput;
    reviewer?: Prisma.UserUpdateOneWithoutReviewedMaintenanceRequestsNestedInput;
    decisionHistory?: Prisma.DecisionHistoryUpdateManyWithoutRequestNestedInput;
};
export type MaintenanceRequestUncheckedUpdateWithoutEquipmentInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    requestType?: Prisma.EnumMaintenanceRequestTypeFieldUpdateOperationsInput | $Enums.MaintenanceRequestType;
    status?: Prisma.EnumMaintenanceRequestStatusFieldUpdateOperationsInput | $Enums.MaintenanceRequestStatus;
    requesterId?: Prisma.IntFieldUpdateOperationsInput | number;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    criticality?: Prisma.EnumCriticalityFieldUpdateOperationsInput | $Enums.Criticality;
    reviewerId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    decisionReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    problem?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    proposedSolution?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    expectedBenefit?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    outcome?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    implementationStatus?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    decisionHistory?: Prisma.DecisionHistoryUncheckedUpdateManyWithoutRequestNestedInput;
};
export type MaintenanceRequestUncheckedUpdateManyWithoutEquipmentInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    requestType?: Prisma.EnumMaintenanceRequestTypeFieldUpdateOperationsInput | $Enums.MaintenanceRequestType;
    status?: Prisma.EnumMaintenanceRequestStatusFieldUpdateOperationsInput | $Enums.MaintenanceRequestStatus;
    requesterId?: Prisma.IntFieldUpdateOperationsInput | number;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    criticality?: Prisma.EnumCriticalityFieldUpdateOperationsInput | $Enums.Criticality;
    reviewerId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    decisionReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    problem?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    proposedSolution?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    expectedBenefit?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    outcome?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    implementationStatus?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
/**
 * Count Type MaintenanceRequestCountOutputType
 */
export type MaintenanceRequestCountOutputType = {
    decisionHistory: number;
};
export type MaintenanceRequestCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    decisionHistory?: boolean | MaintenanceRequestCountOutputTypeCountDecisionHistoryArgs;
};
/**
 * MaintenanceRequestCountOutputType without action
 */
export type MaintenanceRequestCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaintenanceRequestCountOutputType
     */
    select?: Prisma.MaintenanceRequestCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * MaintenanceRequestCountOutputType without action
 */
export type MaintenanceRequestCountOutputTypeCountDecisionHistoryArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DecisionHistoryWhereInput;
};
export type MaintenanceRequestSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    requestType?: boolean;
    status?: boolean;
    equipmentId?: boolean;
    requesterId?: boolean;
    description?: boolean;
    criticality?: boolean;
    reviewerId?: boolean;
    decisionReason?: boolean;
    problem?: boolean;
    proposedSolution?: boolean;
    expectedBenefit?: boolean;
    outcome?: boolean;
    implementationStatus?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    equipment?: boolean | Prisma.EquipmentDefaultArgs<ExtArgs>;
    requester?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    reviewer?: boolean | Prisma.MaintenanceRequest$reviewerArgs<ExtArgs>;
    decisionHistory?: boolean | Prisma.MaintenanceRequest$decisionHistoryArgs<ExtArgs>;
    _count?: boolean | Prisma.MaintenanceRequestCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["maintenanceRequest"]>;
export type MaintenanceRequestSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    requestType?: boolean;
    status?: boolean;
    equipmentId?: boolean;
    requesterId?: boolean;
    description?: boolean;
    criticality?: boolean;
    reviewerId?: boolean;
    decisionReason?: boolean;
    problem?: boolean;
    proposedSolution?: boolean;
    expectedBenefit?: boolean;
    outcome?: boolean;
    implementationStatus?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    equipment?: boolean | Prisma.EquipmentDefaultArgs<ExtArgs>;
    requester?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    reviewer?: boolean | Prisma.MaintenanceRequest$reviewerArgs<ExtArgs>;
}, ExtArgs["result"]["maintenanceRequest"]>;
export type MaintenanceRequestSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    requestType?: boolean;
    status?: boolean;
    equipmentId?: boolean;
    requesterId?: boolean;
    description?: boolean;
    criticality?: boolean;
    reviewerId?: boolean;
    decisionReason?: boolean;
    problem?: boolean;
    proposedSolution?: boolean;
    expectedBenefit?: boolean;
    outcome?: boolean;
    implementationStatus?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    equipment?: boolean | Prisma.EquipmentDefaultArgs<ExtArgs>;
    requester?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    reviewer?: boolean | Prisma.MaintenanceRequest$reviewerArgs<ExtArgs>;
}, ExtArgs["result"]["maintenanceRequest"]>;
export type MaintenanceRequestSelectScalar = {
    id?: boolean;
    requestType?: boolean;
    status?: boolean;
    equipmentId?: boolean;
    requesterId?: boolean;
    description?: boolean;
    criticality?: boolean;
    reviewerId?: boolean;
    decisionReason?: boolean;
    problem?: boolean;
    proposedSolution?: boolean;
    expectedBenefit?: boolean;
    outcome?: boolean;
    implementationStatus?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type MaintenanceRequestOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "requestType" | "status" | "equipmentId" | "requesterId" | "description" | "criticality" | "reviewerId" | "decisionReason" | "problem" | "proposedSolution" | "expectedBenefit" | "outcome" | "implementationStatus" | "createdAt" | "updatedAt", ExtArgs["result"]["maintenanceRequest"]>;
export type MaintenanceRequestInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    equipment?: boolean | Prisma.EquipmentDefaultArgs<ExtArgs>;
    requester?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    reviewer?: boolean | Prisma.MaintenanceRequest$reviewerArgs<ExtArgs>;
    decisionHistory?: boolean | Prisma.MaintenanceRequest$decisionHistoryArgs<ExtArgs>;
    _count?: boolean | Prisma.MaintenanceRequestCountOutputTypeDefaultArgs<ExtArgs>;
};
export type MaintenanceRequestIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    equipment?: boolean | Prisma.EquipmentDefaultArgs<ExtArgs>;
    requester?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    reviewer?: boolean | Prisma.MaintenanceRequest$reviewerArgs<ExtArgs>;
};
export type MaintenanceRequestIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    equipment?: boolean | Prisma.EquipmentDefaultArgs<ExtArgs>;
    requester?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    reviewer?: boolean | Prisma.MaintenanceRequest$reviewerArgs<ExtArgs>;
};
export type $MaintenanceRequestPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "MaintenanceRequest";
    objects: {
        equipment: Prisma.$EquipmentPayload<ExtArgs>;
        requester: Prisma.$UserPayload<ExtArgs>;
        reviewer: Prisma.$UserPayload<ExtArgs> | null;
        decisionHistory: Prisma.$DecisionHistoryPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        requestType: $Enums.MaintenanceRequestType;
        status: $Enums.MaintenanceRequestStatus;
        equipmentId: number;
        requesterId: number;
        description: string;
        criticality: $Enums.Criticality;
        reviewerId: number | null;
        decisionReason: string | null;
        problem: string | null;
        proposedSolution: string | null;
        expectedBenefit: string | null;
        outcome: string | null;
        implementationStatus: string | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["maintenanceRequest"]>;
    composites: {};
};
export type MaintenanceRequestGetPayload<S extends boolean | null | undefined | MaintenanceRequestDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$MaintenanceRequestPayload, S>;
export type MaintenanceRequestCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<MaintenanceRequestFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: MaintenanceRequestCountAggregateInputType | true;
};
export interface MaintenanceRequestDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['MaintenanceRequest'];
        meta: {
            name: 'MaintenanceRequest';
        };
    };
    /**
     * Find zero or one MaintenanceRequest that matches the filter.
     * @param {MaintenanceRequestFindUniqueArgs} args - Arguments to find a MaintenanceRequest
     * @example
     * // Get one MaintenanceRequest
     * const maintenanceRequest = await prisma.maintenanceRequest.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MaintenanceRequestFindUniqueArgs>(args: Prisma.SelectSubset<T, MaintenanceRequestFindUniqueArgs<ExtArgs>>): Prisma.Prisma__MaintenanceRequestClient<runtime.Types.Result.GetResult<Prisma.$MaintenanceRequestPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one MaintenanceRequest that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MaintenanceRequestFindUniqueOrThrowArgs} args - Arguments to find a MaintenanceRequest
     * @example
     * // Get one MaintenanceRequest
     * const maintenanceRequest = await prisma.maintenanceRequest.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MaintenanceRequestFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, MaintenanceRequestFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__MaintenanceRequestClient<runtime.Types.Result.GetResult<Prisma.$MaintenanceRequestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first MaintenanceRequest that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaintenanceRequestFindFirstArgs} args - Arguments to find a MaintenanceRequest
     * @example
     * // Get one MaintenanceRequest
     * const maintenanceRequest = await prisma.maintenanceRequest.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MaintenanceRequestFindFirstArgs>(args?: Prisma.SelectSubset<T, MaintenanceRequestFindFirstArgs<ExtArgs>>): Prisma.Prisma__MaintenanceRequestClient<runtime.Types.Result.GetResult<Prisma.$MaintenanceRequestPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first MaintenanceRequest that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaintenanceRequestFindFirstOrThrowArgs} args - Arguments to find a MaintenanceRequest
     * @example
     * // Get one MaintenanceRequest
     * const maintenanceRequest = await prisma.maintenanceRequest.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MaintenanceRequestFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, MaintenanceRequestFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__MaintenanceRequestClient<runtime.Types.Result.GetResult<Prisma.$MaintenanceRequestPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more MaintenanceRequests that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaintenanceRequestFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MaintenanceRequests
     * const maintenanceRequests = await prisma.maintenanceRequest.findMany()
     *
     * // Get first 10 MaintenanceRequests
     * const maintenanceRequests = await prisma.maintenanceRequest.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const maintenanceRequestWithIdOnly = await prisma.maintenanceRequest.findMany({ select: { id: true } })
     *
     */
    findMany<T extends MaintenanceRequestFindManyArgs>(args?: Prisma.SelectSubset<T, MaintenanceRequestFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MaintenanceRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a MaintenanceRequest.
     * @param {MaintenanceRequestCreateArgs} args - Arguments to create a MaintenanceRequest.
     * @example
     * // Create one MaintenanceRequest
     * const MaintenanceRequest = await prisma.maintenanceRequest.create({
     *   data: {
     *     // ... data to create a MaintenanceRequest
     *   }
     * })
     *
     */
    create<T extends MaintenanceRequestCreateArgs>(args: Prisma.SelectSubset<T, MaintenanceRequestCreateArgs<ExtArgs>>): Prisma.Prisma__MaintenanceRequestClient<runtime.Types.Result.GetResult<Prisma.$MaintenanceRequestPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many MaintenanceRequests.
     * @param {MaintenanceRequestCreateManyArgs} args - Arguments to create many MaintenanceRequests.
     * @example
     * // Create many MaintenanceRequests
     * const maintenanceRequest = await prisma.maintenanceRequest.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends MaintenanceRequestCreateManyArgs>(args?: Prisma.SelectSubset<T, MaintenanceRequestCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many MaintenanceRequests and returns the data saved in the database.
     * @param {MaintenanceRequestCreateManyAndReturnArgs} args - Arguments to create many MaintenanceRequests.
     * @example
     * // Create many MaintenanceRequests
     * const maintenanceRequest = await prisma.maintenanceRequest.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many MaintenanceRequests and only return the `id`
     * const maintenanceRequestWithIdOnly = await prisma.maintenanceRequest.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends MaintenanceRequestCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, MaintenanceRequestCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MaintenanceRequestPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a MaintenanceRequest.
     * @param {MaintenanceRequestDeleteArgs} args - Arguments to delete one MaintenanceRequest.
     * @example
     * // Delete one MaintenanceRequest
     * const MaintenanceRequest = await prisma.maintenanceRequest.delete({
     *   where: {
     *     // ... filter to delete one MaintenanceRequest
     *   }
     * })
     *
     */
    delete<T extends MaintenanceRequestDeleteArgs>(args: Prisma.SelectSubset<T, MaintenanceRequestDeleteArgs<ExtArgs>>): Prisma.Prisma__MaintenanceRequestClient<runtime.Types.Result.GetResult<Prisma.$MaintenanceRequestPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one MaintenanceRequest.
     * @param {MaintenanceRequestUpdateArgs} args - Arguments to update one MaintenanceRequest.
     * @example
     * // Update one MaintenanceRequest
     * const maintenanceRequest = await prisma.maintenanceRequest.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends MaintenanceRequestUpdateArgs>(args: Prisma.SelectSubset<T, MaintenanceRequestUpdateArgs<ExtArgs>>): Prisma.Prisma__MaintenanceRequestClient<runtime.Types.Result.GetResult<Prisma.$MaintenanceRequestPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more MaintenanceRequests.
     * @param {MaintenanceRequestDeleteManyArgs} args - Arguments to filter MaintenanceRequests to delete.
     * @example
     * // Delete a few MaintenanceRequests
     * const { count } = await prisma.maintenanceRequest.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends MaintenanceRequestDeleteManyArgs>(args?: Prisma.SelectSubset<T, MaintenanceRequestDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more MaintenanceRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaintenanceRequestUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MaintenanceRequests
     * const maintenanceRequest = await prisma.maintenanceRequest.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends MaintenanceRequestUpdateManyArgs>(args: Prisma.SelectSubset<T, MaintenanceRequestUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more MaintenanceRequests and returns the data updated in the database.
     * @param {MaintenanceRequestUpdateManyAndReturnArgs} args - Arguments to update many MaintenanceRequests.
     * @example
     * // Update many MaintenanceRequests
     * const maintenanceRequest = await prisma.maintenanceRequest.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more MaintenanceRequests and only return the `id`
     * const maintenanceRequestWithIdOnly = await prisma.maintenanceRequest.updateManyAndReturn({
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
    updateManyAndReturn<T extends MaintenanceRequestUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, MaintenanceRequestUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MaintenanceRequestPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one MaintenanceRequest.
     * @param {MaintenanceRequestUpsertArgs} args - Arguments to update or create a MaintenanceRequest.
     * @example
     * // Update or create a MaintenanceRequest
     * const maintenanceRequest = await prisma.maintenanceRequest.upsert({
     *   create: {
     *     // ... data to create a MaintenanceRequest
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MaintenanceRequest we want to update
     *   }
     * })
     */
    upsert<T extends MaintenanceRequestUpsertArgs>(args: Prisma.SelectSubset<T, MaintenanceRequestUpsertArgs<ExtArgs>>): Prisma.Prisma__MaintenanceRequestClient<runtime.Types.Result.GetResult<Prisma.$MaintenanceRequestPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of MaintenanceRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaintenanceRequestCountArgs} args - Arguments to filter MaintenanceRequests to count.
     * @example
     * // Count the number of MaintenanceRequests
     * const count = await prisma.maintenanceRequest.count({
     *   where: {
     *     // ... the filter for the MaintenanceRequests we want to count
     *   }
     * })
    **/
    count<T extends MaintenanceRequestCountArgs>(args?: Prisma.Subset<T, MaintenanceRequestCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], MaintenanceRequestCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a MaintenanceRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaintenanceRequestAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends MaintenanceRequestAggregateArgs>(args: Prisma.Subset<T, MaintenanceRequestAggregateArgs>): Prisma.PrismaPromise<GetMaintenanceRequestAggregateType<T>>;
    /**
     * Group by MaintenanceRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaintenanceRequestGroupByArgs} args - Group by arguments.
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
    groupBy<T extends MaintenanceRequestGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: MaintenanceRequestGroupByArgs['orderBy'];
    } : {
        orderBy?: MaintenanceRequestGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, MaintenanceRequestGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMaintenanceRequestGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the MaintenanceRequest model
     */
    readonly fields: MaintenanceRequestFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for MaintenanceRequest.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__MaintenanceRequestClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    equipment<T extends Prisma.EquipmentDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.EquipmentDefaultArgs<ExtArgs>>): Prisma.Prisma__EquipmentClient<runtime.Types.Result.GetResult<Prisma.$EquipmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    requester<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    reviewer<T extends Prisma.MaintenanceRequest$reviewerArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.MaintenanceRequest$reviewerArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    decisionHistory<T extends Prisma.MaintenanceRequest$decisionHistoryArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.MaintenanceRequest$decisionHistoryArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DecisionHistoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
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
 * Fields of the MaintenanceRequest model
 */
export interface MaintenanceRequestFieldRefs {
    readonly id: Prisma.FieldRef<"MaintenanceRequest", 'Int'>;
    readonly requestType: Prisma.FieldRef<"MaintenanceRequest", 'MaintenanceRequestType'>;
    readonly status: Prisma.FieldRef<"MaintenanceRequest", 'MaintenanceRequestStatus'>;
    readonly equipmentId: Prisma.FieldRef<"MaintenanceRequest", 'Int'>;
    readonly requesterId: Prisma.FieldRef<"MaintenanceRequest", 'Int'>;
    readonly description: Prisma.FieldRef<"MaintenanceRequest", 'String'>;
    readonly criticality: Prisma.FieldRef<"MaintenanceRequest", 'Criticality'>;
    readonly reviewerId: Prisma.FieldRef<"MaintenanceRequest", 'Int'>;
    readonly decisionReason: Prisma.FieldRef<"MaintenanceRequest", 'String'>;
    readonly problem: Prisma.FieldRef<"MaintenanceRequest", 'String'>;
    readonly proposedSolution: Prisma.FieldRef<"MaintenanceRequest", 'String'>;
    readonly expectedBenefit: Prisma.FieldRef<"MaintenanceRequest", 'String'>;
    readonly outcome: Prisma.FieldRef<"MaintenanceRequest", 'String'>;
    readonly implementationStatus: Prisma.FieldRef<"MaintenanceRequest", 'String'>;
    readonly createdAt: Prisma.FieldRef<"MaintenanceRequest", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"MaintenanceRequest", 'DateTime'>;
}
/**
 * MaintenanceRequest findUnique
 */
export type MaintenanceRequestFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaintenanceRequest
     */
    select?: Prisma.MaintenanceRequestSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MaintenanceRequest
     */
    omit?: Prisma.MaintenanceRequestOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MaintenanceRequestInclude<ExtArgs> | null;
    /**
     * Filter, which MaintenanceRequest to fetch.
     */
    where: Prisma.MaintenanceRequestWhereUniqueInput;
};
/**
 * MaintenanceRequest findUniqueOrThrow
 */
export type MaintenanceRequestFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaintenanceRequest
     */
    select?: Prisma.MaintenanceRequestSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MaintenanceRequest
     */
    omit?: Prisma.MaintenanceRequestOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MaintenanceRequestInclude<ExtArgs> | null;
    /**
     * Filter, which MaintenanceRequest to fetch.
     */
    where: Prisma.MaintenanceRequestWhereUniqueInput;
};
/**
 * MaintenanceRequest findFirst
 */
export type MaintenanceRequestFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaintenanceRequest
     */
    select?: Prisma.MaintenanceRequestSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MaintenanceRequest
     */
    omit?: Prisma.MaintenanceRequestOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MaintenanceRequestInclude<ExtArgs> | null;
    /**
     * Filter, which MaintenanceRequest to fetch.
     */
    where?: Prisma.MaintenanceRequestWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of MaintenanceRequests to fetch.
     */
    orderBy?: Prisma.MaintenanceRequestOrderByWithRelationInput | Prisma.MaintenanceRequestOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for MaintenanceRequests.
     */
    cursor?: Prisma.MaintenanceRequestWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` MaintenanceRequests from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` MaintenanceRequests.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of MaintenanceRequests.
     */
    distinct?: Prisma.MaintenanceRequestScalarFieldEnum | Prisma.MaintenanceRequestScalarFieldEnum[];
};
/**
 * MaintenanceRequest findFirstOrThrow
 */
export type MaintenanceRequestFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaintenanceRequest
     */
    select?: Prisma.MaintenanceRequestSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MaintenanceRequest
     */
    omit?: Prisma.MaintenanceRequestOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MaintenanceRequestInclude<ExtArgs> | null;
    /**
     * Filter, which MaintenanceRequest to fetch.
     */
    where?: Prisma.MaintenanceRequestWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of MaintenanceRequests to fetch.
     */
    orderBy?: Prisma.MaintenanceRequestOrderByWithRelationInput | Prisma.MaintenanceRequestOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for MaintenanceRequests.
     */
    cursor?: Prisma.MaintenanceRequestWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` MaintenanceRequests from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` MaintenanceRequests.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of MaintenanceRequests.
     */
    distinct?: Prisma.MaintenanceRequestScalarFieldEnum | Prisma.MaintenanceRequestScalarFieldEnum[];
};
/**
 * MaintenanceRequest findMany
 */
export type MaintenanceRequestFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaintenanceRequest
     */
    select?: Prisma.MaintenanceRequestSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MaintenanceRequest
     */
    omit?: Prisma.MaintenanceRequestOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MaintenanceRequestInclude<ExtArgs> | null;
    /**
     * Filter, which MaintenanceRequests to fetch.
     */
    where?: Prisma.MaintenanceRequestWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of MaintenanceRequests to fetch.
     */
    orderBy?: Prisma.MaintenanceRequestOrderByWithRelationInput | Prisma.MaintenanceRequestOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing MaintenanceRequests.
     */
    cursor?: Prisma.MaintenanceRequestWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` MaintenanceRequests from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` MaintenanceRequests.
     */
    skip?: number;
    distinct?: Prisma.MaintenanceRequestScalarFieldEnum | Prisma.MaintenanceRequestScalarFieldEnum[];
};
/**
 * MaintenanceRequest create
 */
export type MaintenanceRequestCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaintenanceRequest
     */
    select?: Prisma.MaintenanceRequestSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MaintenanceRequest
     */
    omit?: Prisma.MaintenanceRequestOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MaintenanceRequestInclude<ExtArgs> | null;
    /**
     * The data needed to create a MaintenanceRequest.
     */
    data: Prisma.XOR<Prisma.MaintenanceRequestCreateInput, Prisma.MaintenanceRequestUncheckedCreateInput>;
};
/**
 * MaintenanceRequest createMany
 */
export type MaintenanceRequestCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many MaintenanceRequests.
     */
    data: Prisma.MaintenanceRequestCreateManyInput | Prisma.MaintenanceRequestCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * MaintenanceRequest createManyAndReturn
 */
export type MaintenanceRequestCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaintenanceRequest
     */
    select?: Prisma.MaintenanceRequestSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the MaintenanceRequest
     */
    omit?: Prisma.MaintenanceRequestOmit<ExtArgs> | null;
    /**
     * The data used to create many MaintenanceRequests.
     */
    data: Prisma.MaintenanceRequestCreateManyInput | Prisma.MaintenanceRequestCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MaintenanceRequestIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * MaintenanceRequest update
 */
export type MaintenanceRequestUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaintenanceRequest
     */
    select?: Prisma.MaintenanceRequestSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MaintenanceRequest
     */
    omit?: Prisma.MaintenanceRequestOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MaintenanceRequestInclude<ExtArgs> | null;
    /**
     * The data needed to update a MaintenanceRequest.
     */
    data: Prisma.XOR<Prisma.MaintenanceRequestUpdateInput, Prisma.MaintenanceRequestUncheckedUpdateInput>;
    /**
     * Choose, which MaintenanceRequest to update.
     */
    where: Prisma.MaintenanceRequestWhereUniqueInput;
};
/**
 * MaintenanceRequest updateMany
 */
export type MaintenanceRequestUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update MaintenanceRequests.
     */
    data: Prisma.XOR<Prisma.MaintenanceRequestUpdateManyMutationInput, Prisma.MaintenanceRequestUncheckedUpdateManyInput>;
    /**
     * Filter which MaintenanceRequests to update
     */
    where?: Prisma.MaintenanceRequestWhereInput;
    /**
     * Limit how many MaintenanceRequests to update.
     */
    limit?: number;
};
/**
 * MaintenanceRequest updateManyAndReturn
 */
export type MaintenanceRequestUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaintenanceRequest
     */
    select?: Prisma.MaintenanceRequestSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the MaintenanceRequest
     */
    omit?: Prisma.MaintenanceRequestOmit<ExtArgs> | null;
    /**
     * The data used to update MaintenanceRequests.
     */
    data: Prisma.XOR<Prisma.MaintenanceRequestUpdateManyMutationInput, Prisma.MaintenanceRequestUncheckedUpdateManyInput>;
    /**
     * Filter which MaintenanceRequests to update
     */
    where?: Prisma.MaintenanceRequestWhereInput;
    /**
     * Limit how many MaintenanceRequests to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MaintenanceRequestIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * MaintenanceRequest upsert
 */
export type MaintenanceRequestUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaintenanceRequest
     */
    select?: Prisma.MaintenanceRequestSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MaintenanceRequest
     */
    omit?: Prisma.MaintenanceRequestOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MaintenanceRequestInclude<ExtArgs> | null;
    /**
     * The filter to search for the MaintenanceRequest to update in case it exists.
     */
    where: Prisma.MaintenanceRequestWhereUniqueInput;
    /**
     * In case the MaintenanceRequest found by the `where` argument doesn't exist, create a new MaintenanceRequest with this data.
     */
    create: Prisma.XOR<Prisma.MaintenanceRequestCreateInput, Prisma.MaintenanceRequestUncheckedCreateInput>;
    /**
     * In case the MaintenanceRequest was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.MaintenanceRequestUpdateInput, Prisma.MaintenanceRequestUncheckedUpdateInput>;
};
/**
 * MaintenanceRequest delete
 */
export type MaintenanceRequestDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaintenanceRequest
     */
    select?: Prisma.MaintenanceRequestSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MaintenanceRequest
     */
    omit?: Prisma.MaintenanceRequestOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MaintenanceRequestInclude<ExtArgs> | null;
    /**
     * Filter which MaintenanceRequest to delete.
     */
    where: Prisma.MaintenanceRequestWhereUniqueInput;
};
/**
 * MaintenanceRequest deleteMany
 */
export type MaintenanceRequestDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which MaintenanceRequests to delete
     */
    where?: Prisma.MaintenanceRequestWhereInput;
    /**
     * Limit how many MaintenanceRequests to delete.
     */
    limit?: number;
};
/**
 * MaintenanceRequest.reviewer
 */
export type MaintenanceRequest$reviewerArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * MaintenanceRequest.decisionHistory
 */
export type MaintenanceRequest$decisionHistoryArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    where?: Prisma.DecisionHistoryWhereInput;
    orderBy?: Prisma.DecisionHistoryOrderByWithRelationInput | Prisma.DecisionHistoryOrderByWithRelationInput[];
    cursor?: Prisma.DecisionHistoryWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.DecisionHistoryScalarFieldEnum | Prisma.DecisionHistoryScalarFieldEnum[];
};
/**
 * MaintenanceRequest without action
 */
export type MaintenanceRequestDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaintenanceRequest
     */
    select?: Prisma.MaintenanceRequestSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MaintenanceRequest
     */
    omit?: Prisma.MaintenanceRequestOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MaintenanceRequestInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=MaintenanceRequest.d.ts.map