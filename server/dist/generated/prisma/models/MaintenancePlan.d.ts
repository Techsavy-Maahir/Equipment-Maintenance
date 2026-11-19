import type * as runtime from "@prisma/client/runtime/library";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model MaintenancePlan
 *
 */
export type MaintenancePlanModel = runtime.Types.Result.DefaultSelection<Prisma.$MaintenancePlanPayload>;
export type AggregateMaintenancePlan = {
    _count: MaintenancePlanCountAggregateOutputType | null;
    _avg: MaintenancePlanAvgAggregateOutputType | null;
    _sum: MaintenancePlanSumAggregateOutputType | null;
    _min: MaintenancePlanMinAggregateOutputType | null;
    _max: MaintenancePlanMaxAggregateOutputType | null;
};
export type MaintenancePlanAvgAggregateOutputType = {
    id: number | null;
    equipmentId: number | null;
    assignedTechnicianId: number | null;
};
export type MaintenancePlanSumAggregateOutputType = {
    id: number | null;
    equipmentId: number | null;
    assignedTechnicianId: number | null;
};
export type MaintenancePlanMinAggregateOutputType = {
    id: number | null;
    equipmentId: number | null;
    activity: string | null;
    instructions: string | null;
    frequency: $Enums.MaintenanceFrequency | null;
    assignedTechnicianId: number | null;
    lastCompletedAt: Date | null;
    nextDueDate: Date | null;
    isActive: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type MaintenancePlanMaxAggregateOutputType = {
    id: number | null;
    equipmentId: number | null;
    activity: string | null;
    instructions: string | null;
    frequency: $Enums.MaintenanceFrequency | null;
    assignedTechnicianId: number | null;
    lastCompletedAt: Date | null;
    nextDueDate: Date | null;
    isActive: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type MaintenancePlanCountAggregateOutputType = {
    id: number;
    equipmentId: number;
    activity: number;
    instructions: number;
    frequency: number;
    assignedTechnicianId: number;
    lastCompletedAt: number;
    nextDueDate: number;
    isActive: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type MaintenancePlanAvgAggregateInputType = {
    id?: true;
    equipmentId?: true;
    assignedTechnicianId?: true;
};
export type MaintenancePlanSumAggregateInputType = {
    id?: true;
    equipmentId?: true;
    assignedTechnicianId?: true;
};
export type MaintenancePlanMinAggregateInputType = {
    id?: true;
    equipmentId?: true;
    activity?: true;
    instructions?: true;
    frequency?: true;
    assignedTechnicianId?: true;
    lastCompletedAt?: true;
    nextDueDate?: true;
    isActive?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type MaintenancePlanMaxAggregateInputType = {
    id?: true;
    equipmentId?: true;
    activity?: true;
    instructions?: true;
    frequency?: true;
    assignedTechnicianId?: true;
    lastCompletedAt?: true;
    nextDueDate?: true;
    isActive?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type MaintenancePlanCountAggregateInputType = {
    id?: true;
    equipmentId?: true;
    activity?: true;
    instructions?: true;
    frequency?: true;
    assignedTechnicianId?: true;
    lastCompletedAt?: true;
    nextDueDate?: true;
    isActive?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type MaintenancePlanAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which MaintenancePlan to aggregate.
     */
    where?: Prisma.MaintenancePlanWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of MaintenancePlans to fetch.
     */
    orderBy?: Prisma.MaintenancePlanOrderByWithRelationInput | Prisma.MaintenancePlanOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.MaintenancePlanWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` MaintenancePlans from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` MaintenancePlans.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned MaintenancePlans
    **/
    _count?: true | MaintenancePlanCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: MaintenancePlanAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: MaintenancePlanSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: MaintenancePlanMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: MaintenancePlanMaxAggregateInputType;
};
export type GetMaintenancePlanAggregateType<T extends MaintenancePlanAggregateArgs> = {
    [P in keyof T & keyof AggregateMaintenancePlan]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateMaintenancePlan[P]> : Prisma.GetScalarType<T[P], AggregateMaintenancePlan[P]>;
};
export type MaintenancePlanGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MaintenancePlanWhereInput;
    orderBy?: Prisma.MaintenancePlanOrderByWithAggregationInput | Prisma.MaintenancePlanOrderByWithAggregationInput[];
    by: Prisma.MaintenancePlanScalarFieldEnum[] | Prisma.MaintenancePlanScalarFieldEnum;
    having?: Prisma.MaintenancePlanScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: MaintenancePlanCountAggregateInputType | true;
    _avg?: MaintenancePlanAvgAggregateInputType;
    _sum?: MaintenancePlanSumAggregateInputType;
    _min?: MaintenancePlanMinAggregateInputType;
    _max?: MaintenancePlanMaxAggregateInputType;
};
export type MaintenancePlanGroupByOutputType = {
    id: number;
    equipmentId: number;
    activity: string;
    instructions: string | null;
    frequency: $Enums.MaintenanceFrequency;
    assignedTechnicianId: number | null;
    lastCompletedAt: Date | null;
    nextDueDate: Date;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    _count: MaintenancePlanCountAggregateOutputType | null;
    _avg: MaintenancePlanAvgAggregateOutputType | null;
    _sum: MaintenancePlanSumAggregateOutputType | null;
    _min: MaintenancePlanMinAggregateOutputType | null;
    _max: MaintenancePlanMaxAggregateOutputType | null;
};
type GetMaintenancePlanGroupByPayload<T extends MaintenancePlanGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<MaintenancePlanGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof MaintenancePlanGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], MaintenancePlanGroupByOutputType[P]> : Prisma.GetScalarType<T[P], MaintenancePlanGroupByOutputType[P]>;
}>>;
export type MaintenancePlanWhereInput = {
    AND?: Prisma.MaintenancePlanWhereInput | Prisma.MaintenancePlanWhereInput[];
    OR?: Prisma.MaintenancePlanWhereInput[];
    NOT?: Prisma.MaintenancePlanWhereInput | Prisma.MaintenancePlanWhereInput[];
    id?: Prisma.IntFilter<"MaintenancePlan"> | number;
    equipmentId?: Prisma.IntFilter<"MaintenancePlan"> | number;
    activity?: Prisma.StringFilter<"MaintenancePlan"> | string;
    instructions?: Prisma.StringNullableFilter<"MaintenancePlan"> | string | null;
    frequency?: Prisma.EnumMaintenanceFrequencyFilter<"MaintenancePlan"> | $Enums.MaintenanceFrequency;
    assignedTechnicianId?: Prisma.IntNullableFilter<"MaintenancePlan"> | number | null;
    lastCompletedAt?: Prisma.DateTimeNullableFilter<"MaintenancePlan"> | Date | string | null;
    nextDueDate?: Prisma.DateTimeFilter<"MaintenancePlan"> | Date | string;
    isActive?: Prisma.BoolFilter<"MaintenancePlan"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"MaintenancePlan"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"MaintenancePlan"> | Date | string;
    equipment?: Prisma.XOR<Prisma.EquipmentScalarRelationFilter, Prisma.EquipmentWhereInput>;
    assignedTechnician?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
    occurrences?: Prisma.MaintenanceOccurrenceListRelationFilter;
};
export type MaintenancePlanOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    equipmentId?: Prisma.SortOrder;
    activity?: Prisma.SortOrder;
    instructions?: Prisma.SortOrderInput | Prisma.SortOrder;
    frequency?: Prisma.SortOrder;
    assignedTechnicianId?: Prisma.SortOrderInput | Prisma.SortOrder;
    lastCompletedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    nextDueDate?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    equipment?: Prisma.EquipmentOrderByWithRelationInput;
    assignedTechnician?: Prisma.UserOrderByWithRelationInput;
    occurrences?: Prisma.MaintenanceOccurrenceOrderByRelationAggregateInput;
};
export type MaintenancePlanWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    AND?: Prisma.MaintenancePlanWhereInput | Prisma.MaintenancePlanWhereInput[];
    OR?: Prisma.MaintenancePlanWhereInput[];
    NOT?: Prisma.MaintenancePlanWhereInput | Prisma.MaintenancePlanWhereInput[];
    equipmentId?: Prisma.IntFilter<"MaintenancePlan"> | number;
    activity?: Prisma.StringFilter<"MaintenancePlan"> | string;
    instructions?: Prisma.StringNullableFilter<"MaintenancePlan"> | string | null;
    frequency?: Prisma.EnumMaintenanceFrequencyFilter<"MaintenancePlan"> | $Enums.MaintenanceFrequency;
    assignedTechnicianId?: Prisma.IntNullableFilter<"MaintenancePlan"> | number | null;
    lastCompletedAt?: Prisma.DateTimeNullableFilter<"MaintenancePlan"> | Date | string | null;
    nextDueDate?: Prisma.DateTimeFilter<"MaintenancePlan"> | Date | string;
    isActive?: Prisma.BoolFilter<"MaintenancePlan"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"MaintenancePlan"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"MaintenancePlan"> | Date | string;
    equipment?: Prisma.XOR<Prisma.EquipmentScalarRelationFilter, Prisma.EquipmentWhereInput>;
    assignedTechnician?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
    occurrences?: Prisma.MaintenanceOccurrenceListRelationFilter;
}, "id">;
export type MaintenancePlanOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    equipmentId?: Prisma.SortOrder;
    activity?: Prisma.SortOrder;
    instructions?: Prisma.SortOrderInput | Prisma.SortOrder;
    frequency?: Prisma.SortOrder;
    assignedTechnicianId?: Prisma.SortOrderInput | Prisma.SortOrder;
    lastCompletedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    nextDueDate?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.MaintenancePlanCountOrderByAggregateInput;
    _avg?: Prisma.MaintenancePlanAvgOrderByAggregateInput;
    _max?: Prisma.MaintenancePlanMaxOrderByAggregateInput;
    _min?: Prisma.MaintenancePlanMinOrderByAggregateInput;
    _sum?: Prisma.MaintenancePlanSumOrderByAggregateInput;
};
export type MaintenancePlanScalarWhereWithAggregatesInput = {
    AND?: Prisma.MaintenancePlanScalarWhereWithAggregatesInput | Prisma.MaintenancePlanScalarWhereWithAggregatesInput[];
    OR?: Prisma.MaintenancePlanScalarWhereWithAggregatesInput[];
    NOT?: Prisma.MaintenancePlanScalarWhereWithAggregatesInput | Prisma.MaintenancePlanScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"MaintenancePlan"> | number;
    equipmentId?: Prisma.IntWithAggregatesFilter<"MaintenancePlan"> | number;
    activity?: Prisma.StringWithAggregatesFilter<"MaintenancePlan"> | string;
    instructions?: Prisma.StringNullableWithAggregatesFilter<"MaintenancePlan"> | string | null;
    frequency?: Prisma.EnumMaintenanceFrequencyWithAggregatesFilter<"MaintenancePlan"> | $Enums.MaintenanceFrequency;
    assignedTechnicianId?: Prisma.IntNullableWithAggregatesFilter<"MaintenancePlan"> | number | null;
    lastCompletedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"MaintenancePlan"> | Date | string | null;
    nextDueDate?: Prisma.DateTimeWithAggregatesFilter<"MaintenancePlan"> | Date | string;
    isActive?: Prisma.BoolWithAggregatesFilter<"MaintenancePlan"> | boolean;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"MaintenancePlan"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"MaintenancePlan"> | Date | string;
};
export type MaintenancePlanCreateInput = {
    activity: string;
    instructions?: string | null;
    frequency: $Enums.MaintenanceFrequency;
    lastCompletedAt?: Date | string | null;
    nextDueDate: Date | string;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    equipment: Prisma.EquipmentCreateNestedOneWithoutMaintenancePlansInput;
    assignedTechnician?: Prisma.UserCreateNestedOneWithoutMaintenancePlansInput;
    occurrences?: Prisma.MaintenanceOccurrenceCreateNestedManyWithoutMaintenancePlanInput;
};
export type MaintenancePlanUncheckedCreateInput = {
    id?: number;
    equipmentId: number;
    activity: string;
    instructions?: string | null;
    frequency: $Enums.MaintenanceFrequency;
    assignedTechnicianId?: number | null;
    lastCompletedAt?: Date | string | null;
    nextDueDate: Date | string;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    occurrences?: Prisma.MaintenanceOccurrenceUncheckedCreateNestedManyWithoutMaintenancePlanInput;
};
export type MaintenancePlanUpdateInput = {
    activity?: Prisma.StringFieldUpdateOperationsInput | string;
    instructions?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    frequency?: Prisma.EnumMaintenanceFrequencyFieldUpdateOperationsInput | $Enums.MaintenanceFrequency;
    lastCompletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    nextDueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    equipment?: Prisma.EquipmentUpdateOneRequiredWithoutMaintenancePlansNestedInput;
    assignedTechnician?: Prisma.UserUpdateOneWithoutMaintenancePlansNestedInput;
    occurrences?: Prisma.MaintenanceOccurrenceUpdateManyWithoutMaintenancePlanNestedInput;
};
export type MaintenancePlanUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    equipmentId?: Prisma.IntFieldUpdateOperationsInput | number;
    activity?: Prisma.StringFieldUpdateOperationsInput | string;
    instructions?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    frequency?: Prisma.EnumMaintenanceFrequencyFieldUpdateOperationsInput | $Enums.MaintenanceFrequency;
    assignedTechnicianId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    lastCompletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    nextDueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    occurrences?: Prisma.MaintenanceOccurrenceUncheckedUpdateManyWithoutMaintenancePlanNestedInput;
};
export type MaintenancePlanCreateManyInput = {
    id?: number;
    equipmentId: number;
    activity: string;
    instructions?: string | null;
    frequency: $Enums.MaintenanceFrequency;
    assignedTechnicianId?: number | null;
    lastCompletedAt?: Date | string | null;
    nextDueDate: Date | string;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type MaintenancePlanUpdateManyMutationInput = {
    activity?: Prisma.StringFieldUpdateOperationsInput | string;
    instructions?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    frequency?: Prisma.EnumMaintenanceFrequencyFieldUpdateOperationsInput | $Enums.MaintenanceFrequency;
    lastCompletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    nextDueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MaintenancePlanUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    equipmentId?: Prisma.IntFieldUpdateOperationsInput | number;
    activity?: Prisma.StringFieldUpdateOperationsInput | string;
    instructions?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    frequency?: Prisma.EnumMaintenanceFrequencyFieldUpdateOperationsInput | $Enums.MaintenanceFrequency;
    assignedTechnicianId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    lastCompletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    nextDueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MaintenancePlanListRelationFilter = {
    every?: Prisma.MaintenancePlanWhereInput;
    some?: Prisma.MaintenancePlanWhereInput;
    none?: Prisma.MaintenancePlanWhereInput;
};
export type MaintenancePlanOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type MaintenancePlanCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    equipmentId?: Prisma.SortOrder;
    activity?: Prisma.SortOrder;
    instructions?: Prisma.SortOrder;
    frequency?: Prisma.SortOrder;
    assignedTechnicianId?: Prisma.SortOrder;
    lastCompletedAt?: Prisma.SortOrder;
    nextDueDate?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type MaintenancePlanAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    equipmentId?: Prisma.SortOrder;
    assignedTechnicianId?: Prisma.SortOrder;
};
export type MaintenancePlanMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    equipmentId?: Prisma.SortOrder;
    activity?: Prisma.SortOrder;
    instructions?: Prisma.SortOrder;
    frequency?: Prisma.SortOrder;
    assignedTechnicianId?: Prisma.SortOrder;
    lastCompletedAt?: Prisma.SortOrder;
    nextDueDate?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type MaintenancePlanMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    equipmentId?: Prisma.SortOrder;
    activity?: Prisma.SortOrder;
    instructions?: Prisma.SortOrder;
    frequency?: Prisma.SortOrder;
    assignedTechnicianId?: Prisma.SortOrder;
    lastCompletedAt?: Prisma.SortOrder;
    nextDueDate?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type MaintenancePlanSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    equipmentId?: Prisma.SortOrder;
    assignedTechnicianId?: Prisma.SortOrder;
};
export type MaintenancePlanScalarRelationFilter = {
    is?: Prisma.MaintenancePlanWhereInput;
    isNot?: Prisma.MaintenancePlanWhereInput;
};
export type MaintenancePlanCreateNestedManyWithoutAssignedTechnicianInput = {
    create?: Prisma.XOR<Prisma.MaintenancePlanCreateWithoutAssignedTechnicianInput, Prisma.MaintenancePlanUncheckedCreateWithoutAssignedTechnicianInput> | Prisma.MaintenancePlanCreateWithoutAssignedTechnicianInput[] | Prisma.MaintenancePlanUncheckedCreateWithoutAssignedTechnicianInput[];
    connectOrCreate?: Prisma.MaintenancePlanCreateOrConnectWithoutAssignedTechnicianInput | Prisma.MaintenancePlanCreateOrConnectWithoutAssignedTechnicianInput[];
    createMany?: Prisma.MaintenancePlanCreateManyAssignedTechnicianInputEnvelope;
    connect?: Prisma.MaintenancePlanWhereUniqueInput | Prisma.MaintenancePlanWhereUniqueInput[];
};
export type MaintenancePlanUncheckedCreateNestedManyWithoutAssignedTechnicianInput = {
    create?: Prisma.XOR<Prisma.MaintenancePlanCreateWithoutAssignedTechnicianInput, Prisma.MaintenancePlanUncheckedCreateWithoutAssignedTechnicianInput> | Prisma.MaintenancePlanCreateWithoutAssignedTechnicianInput[] | Prisma.MaintenancePlanUncheckedCreateWithoutAssignedTechnicianInput[];
    connectOrCreate?: Prisma.MaintenancePlanCreateOrConnectWithoutAssignedTechnicianInput | Prisma.MaintenancePlanCreateOrConnectWithoutAssignedTechnicianInput[];
    createMany?: Prisma.MaintenancePlanCreateManyAssignedTechnicianInputEnvelope;
    connect?: Prisma.MaintenancePlanWhereUniqueInput | Prisma.MaintenancePlanWhereUniqueInput[];
};
export type MaintenancePlanUpdateManyWithoutAssignedTechnicianNestedInput = {
    create?: Prisma.XOR<Prisma.MaintenancePlanCreateWithoutAssignedTechnicianInput, Prisma.MaintenancePlanUncheckedCreateWithoutAssignedTechnicianInput> | Prisma.MaintenancePlanCreateWithoutAssignedTechnicianInput[] | Prisma.MaintenancePlanUncheckedCreateWithoutAssignedTechnicianInput[];
    connectOrCreate?: Prisma.MaintenancePlanCreateOrConnectWithoutAssignedTechnicianInput | Prisma.MaintenancePlanCreateOrConnectWithoutAssignedTechnicianInput[];
    upsert?: Prisma.MaintenancePlanUpsertWithWhereUniqueWithoutAssignedTechnicianInput | Prisma.MaintenancePlanUpsertWithWhereUniqueWithoutAssignedTechnicianInput[];
    createMany?: Prisma.MaintenancePlanCreateManyAssignedTechnicianInputEnvelope;
    set?: Prisma.MaintenancePlanWhereUniqueInput | Prisma.MaintenancePlanWhereUniqueInput[];
    disconnect?: Prisma.MaintenancePlanWhereUniqueInput | Prisma.MaintenancePlanWhereUniqueInput[];
    delete?: Prisma.MaintenancePlanWhereUniqueInput | Prisma.MaintenancePlanWhereUniqueInput[];
    connect?: Prisma.MaintenancePlanWhereUniqueInput | Prisma.MaintenancePlanWhereUniqueInput[];
    update?: Prisma.MaintenancePlanUpdateWithWhereUniqueWithoutAssignedTechnicianInput | Prisma.MaintenancePlanUpdateWithWhereUniqueWithoutAssignedTechnicianInput[];
    updateMany?: Prisma.MaintenancePlanUpdateManyWithWhereWithoutAssignedTechnicianInput | Prisma.MaintenancePlanUpdateManyWithWhereWithoutAssignedTechnicianInput[];
    deleteMany?: Prisma.MaintenancePlanScalarWhereInput | Prisma.MaintenancePlanScalarWhereInput[];
};
export type MaintenancePlanUncheckedUpdateManyWithoutAssignedTechnicianNestedInput = {
    create?: Prisma.XOR<Prisma.MaintenancePlanCreateWithoutAssignedTechnicianInput, Prisma.MaintenancePlanUncheckedCreateWithoutAssignedTechnicianInput> | Prisma.MaintenancePlanCreateWithoutAssignedTechnicianInput[] | Prisma.MaintenancePlanUncheckedCreateWithoutAssignedTechnicianInput[];
    connectOrCreate?: Prisma.MaintenancePlanCreateOrConnectWithoutAssignedTechnicianInput | Prisma.MaintenancePlanCreateOrConnectWithoutAssignedTechnicianInput[];
    upsert?: Prisma.MaintenancePlanUpsertWithWhereUniqueWithoutAssignedTechnicianInput | Prisma.MaintenancePlanUpsertWithWhereUniqueWithoutAssignedTechnicianInput[];
    createMany?: Prisma.MaintenancePlanCreateManyAssignedTechnicianInputEnvelope;
    set?: Prisma.MaintenancePlanWhereUniqueInput | Prisma.MaintenancePlanWhereUniqueInput[];
    disconnect?: Prisma.MaintenancePlanWhereUniqueInput | Prisma.MaintenancePlanWhereUniqueInput[];
    delete?: Prisma.MaintenancePlanWhereUniqueInput | Prisma.MaintenancePlanWhereUniqueInput[];
    connect?: Prisma.MaintenancePlanWhereUniqueInput | Prisma.MaintenancePlanWhereUniqueInput[];
    update?: Prisma.MaintenancePlanUpdateWithWhereUniqueWithoutAssignedTechnicianInput | Prisma.MaintenancePlanUpdateWithWhereUniqueWithoutAssignedTechnicianInput[];
    updateMany?: Prisma.MaintenancePlanUpdateManyWithWhereWithoutAssignedTechnicianInput | Prisma.MaintenancePlanUpdateManyWithWhereWithoutAssignedTechnicianInput[];
    deleteMany?: Prisma.MaintenancePlanScalarWhereInput | Prisma.MaintenancePlanScalarWhereInput[];
};
export type MaintenancePlanCreateNestedManyWithoutEquipmentInput = {
    create?: Prisma.XOR<Prisma.MaintenancePlanCreateWithoutEquipmentInput, Prisma.MaintenancePlanUncheckedCreateWithoutEquipmentInput> | Prisma.MaintenancePlanCreateWithoutEquipmentInput[] | Prisma.MaintenancePlanUncheckedCreateWithoutEquipmentInput[];
    connectOrCreate?: Prisma.MaintenancePlanCreateOrConnectWithoutEquipmentInput | Prisma.MaintenancePlanCreateOrConnectWithoutEquipmentInput[];
    createMany?: Prisma.MaintenancePlanCreateManyEquipmentInputEnvelope;
    connect?: Prisma.MaintenancePlanWhereUniqueInput | Prisma.MaintenancePlanWhereUniqueInput[];
};
export type MaintenancePlanUncheckedCreateNestedManyWithoutEquipmentInput = {
    create?: Prisma.XOR<Prisma.MaintenancePlanCreateWithoutEquipmentInput, Prisma.MaintenancePlanUncheckedCreateWithoutEquipmentInput> | Prisma.MaintenancePlanCreateWithoutEquipmentInput[] | Prisma.MaintenancePlanUncheckedCreateWithoutEquipmentInput[];
    connectOrCreate?: Prisma.MaintenancePlanCreateOrConnectWithoutEquipmentInput | Prisma.MaintenancePlanCreateOrConnectWithoutEquipmentInput[];
    createMany?: Prisma.MaintenancePlanCreateManyEquipmentInputEnvelope;
    connect?: Prisma.MaintenancePlanWhereUniqueInput | Prisma.MaintenancePlanWhereUniqueInput[];
};
export type MaintenancePlanUpdateManyWithoutEquipmentNestedInput = {
    create?: Prisma.XOR<Prisma.MaintenancePlanCreateWithoutEquipmentInput, Prisma.MaintenancePlanUncheckedCreateWithoutEquipmentInput> | Prisma.MaintenancePlanCreateWithoutEquipmentInput[] | Prisma.MaintenancePlanUncheckedCreateWithoutEquipmentInput[];
    connectOrCreate?: Prisma.MaintenancePlanCreateOrConnectWithoutEquipmentInput | Prisma.MaintenancePlanCreateOrConnectWithoutEquipmentInput[];
    upsert?: Prisma.MaintenancePlanUpsertWithWhereUniqueWithoutEquipmentInput | Prisma.MaintenancePlanUpsertWithWhereUniqueWithoutEquipmentInput[];
    createMany?: Prisma.MaintenancePlanCreateManyEquipmentInputEnvelope;
    set?: Prisma.MaintenancePlanWhereUniqueInput | Prisma.MaintenancePlanWhereUniqueInput[];
    disconnect?: Prisma.MaintenancePlanWhereUniqueInput | Prisma.MaintenancePlanWhereUniqueInput[];
    delete?: Prisma.MaintenancePlanWhereUniqueInput | Prisma.MaintenancePlanWhereUniqueInput[];
    connect?: Prisma.MaintenancePlanWhereUniqueInput | Prisma.MaintenancePlanWhereUniqueInput[];
    update?: Prisma.MaintenancePlanUpdateWithWhereUniqueWithoutEquipmentInput | Prisma.MaintenancePlanUpdateWithWhereUniqueWithoutEquipmentInput[];
    updateMany?: Prisma.MaintenancePlanUpdateManyWithWhereWithoutEquipmentInput | Prisma.MaintenancePlanUpdateManyWithWhereWithoutEquipmentInput[];
    deleteMany?: Prisma.MaintenancePlanScalarWhereInput | Prisma.MaintenancePlanScalarWhereInput[];
};
export type MaintenancePlanUncheckedUpdateManyWithoutEquipmentNestedInput = {
    create?: Prisma.XOR<Prisma.MaintenancePlanCreateWithoutEquipmentInput, Prisma.MaintenancePlanUncheckedCreateWithoutEquipmentInput> | Prisma.MaintenancePlanCreateWithoutEquipmentInput[] | Prisma.MaintenancePlanUncheckedCreateWithoutEquipmentInput[];
    connectOrCreate?: Prisma.MaintenancePlanCreateOrConnectWithoutEquipmentInput | Prisma.MaintenancePlanCreateOrConnectWithoutEquipmentInput[];
    upsert?: Prisma.MaintenancePlanUpsertWithWhereUniqueWithoutEquipmentInput | Prisma.MaintenancePlanUpsertWithWhereUniqueWithoutEquipmentInput[];
    createMany?: Prisma.MaintenancePlanCreateManyEquipmentInputEnvelope;
    set?: Prisma.MaintenancePlanWhereUniqueInput | Prisma.MaintenancePlanWhereUniqueInput[];
    disconnect?: Prisma.MaintenancePlanWhereUniqueInput | Prisma.MaintenancePlanWhereUniqueInput[];
    delete?: Prisma.MaintenancePlanWhereUniqueInput | Prisma.MaintenancePlanWhereUniqueInput[];
    connect?: Prisma.MaintenancePlanWhereUniqueInput | Prisma.MaintenancePlanWhereUniqueInput[];
    update?: Prisma.MaintenancePlanUpdateWithWhereUniqueWithoutEquipmentInput | Prisma.MaintenancePlanUpdateWithWhereUniqueWithoutEquipmentInput[];
    updateMany?: Prisma.MaintenancePlanUpdateManyWithWhereWithoutEquipmentInput | Prisma.MaintenancePlanUpdateManyWithWhereWithoutEquipmentInput[];
    deleteMany?: Prisma.MaintenancePlanScalarWhereInput | Prisma.MaintenancePlanScalarWhereInput[];
};
export type EnumMaintenanceFrequencyFieldUpdateOperationsInput = {
    set?: $Enums.MaintenanceFrequency;
};
export type MaintenancePlanCreateNestedOneWithoutOccurrencesInput = {
    create?: Prisma.XOR<Prisma.MaintenancePlanCreateWithoutOccurrencesInput, Prisma.MaintenancePlanUncheckedCreateWithoutOccurrencesInput>;
    connectOrCreate?: Prisma.MaintenancePlanCreateOrConnectWithoutOccurrencesInput;
    connect?: Prisma.MaintenancePlanWhereUniqueInput;
};
export type MaintenancePlanUpdateOneRequiredWithoutOccurrencesNestedInput = {
    create?: Prisma.XOR<Prisma.MaintenancePlanCreateWithoutOccurrencesInput, Prisma.MaintenancePlanUncheckedCreateWithoutOccurrencesInput>;
    connectOrCreate?: Prisma.MaintenancePlanCreateOrConnectWithoutOccurrencesInput;
    upsert?: Prisma.MaintenancePlanUpsertWithoutOccurrencesInput;
    connect?: Prisma.MaintenancePlanWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.MaintenancePlanUpdateToOneWithWhereWithoutOccurrencesInput, Prisma.MaintenancePlanUpdateWithoutOccurrencesInput>, Prisma.MaintenancePlanUncheckedUpdateWithoutOccurrencesInput>;
};
export type MaintenancePlanCreateWithoutAssignedTechnicianInput = {
    activity: string;
    instructions?: string | null;
    frequency: $Enums.MaintenanceFrequency;
    lastCompletedAt?: Date | string | null;
    nextDueDate: Date | string;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    equipment: Prisma.EquipmentCreateNestedOneWithoutMaintenancePlansInput;
    occurrences?: Prisma.MaintenanceOccurrenceCreateNestedManyWithoutMaintenancePlanInput;
};
export type MaintenancePlanUncheckedCreateWithoutAssignedTechnicianInput = {
    id?: number;
    equipmentId: number;
    activity: string;
    instructions?: string | null;
    frequency: $Enums.MaintenanceFrequency;
    lastCompletedAt?: Date | string | null;
    nextDueDate: Date | string;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    occurrences?: Prisma.MaintenanceOccurrenceUncheckedCreateNestedManyWithoutMaintenancePlanInput;
};
export type MaintenancePlanCreateOrConnectWithoutAssignedTechnicianInput = {
    where: Prisma.MaintenancePlanWhereUniqueInput;
    create: Prisma.XOR<Prisma.MaintenancePlanCreateWithoutAssignedTechnicianInput, Prisma.MaintenancePlanUncheckedCreateWithoutAssignedTechnicianInput>;
};
export type MaintenancePlanCreateManyAssignedTechnicianInputEnvelope = {
    data: Prisma.MaintenancePlanCreateManyAssignedTechnicianInput | Prisma.MaintenancePlanCreateManyAssignedTechnicianInput[];
    skipDuplicates?: boolean;
};
export type MaintenancePlanUpsertWithWhereUniqueWithoutAssignedTechnicianInput = {
    where: Prisma.MaintenancePlanWhereUniqueInput;
    update: Prisma.XOR<Prisma.MaintenancePlanUpdateWithoutAssignedTechnicianInput, Prisma.MaintenancePlanUncheckedUpdateWithoutAssignedTechnicianInput>;
    create: Prisma.XOR<Prisma.MaintenancePlanCreateWithoutAssignedTechnicianInput, Prisma.MaintenancePlanUncheckedCreateWithoutAssignedTechnicianInput>;
};
export type MaintenancePlanUpdateWithWhereUniqueWithoutAssignedTechnicianInput = {
    where: Prisma.MaintenancePlanWhereUniqueInput;
    data: Prisma.XOR<Prisma.MaintenancePlanUpdateWithoutAssignedTechnicianInput, Prisma.MaintenancePlanUncheckedUpdateWithoutAssignedTechnicianInput>;
};
export type MaintenancePlanUpdateManyWithWhereWithoutAssignedTechnicianInput = {
    where: Prisma.MaintenancePlanScalarWhereInput;
    data: Prisma.XOR<Prisma.MaintenancePlanUpdateManyMutationInput, Prisma.MaintenancePlanUncheckedUpdateManyWithoutAssignedTechnicianInput>;
};
export type MaintenancePlanScalarWhereInput = {
    AND?: Prisma.MaintenancePlanScalarWhereInput | Prisma.MaintenancePlanScalarWhereInput[];
    OR?: Prisma.MaintenancePlanScalarWhereInput[];
    NOT?: Prisma.MaintenancePlanScalarWhereInput | Prisma.MaintenancePlanScalarWhereInput[];
    id?: Prisma.IntFilter<"MaintenancePlan"> | number;
    equipmentId?: Prisma.IntFilter<"MaintenancePlan"> | number;
    activity?: Prisma.StringFilter<"MaintenancePlan"> | string;
    instructions?: Prisma.StringNullableFilter<"MaintenancePlan"> | string | null;
    frequency?: Prisma.EnumMaintenanceFrequencyFilter<"MaintenancePlan"> | $Enums.MaintenanceFrequency;
    assignedTechnicianId?: Prisma.IntNullableFilter<"MaintenancePlan"> | number | null;
    lastCompletedAt?: Prisma.DateTimeNullableFilter<"MaintenancePlan"> | Date | string | null;
    nextDueDate?: Prisma.DateTimeFilter<"MaintenancePlan"> | Date | string;
    isActive?: Prisma.BoolFilter<"MaintenancePlan"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"MaintenancePlan"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"MaintenancePlan"> | Date | string;
};
export type MaintenancePlanCreateWithoutEquipmentInput = {
    activity: string;
    instructions?: string | null;
    frequency: $Enums.MaintenanceFrequency;
    lastCompletedAt?: Date | string | null;
    nextDueDate: Date | string;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    assignedTechnician?: Prisma.UserCreateNestedOneWithoutMaintenancePlansInput;
    occurrences?: Prisma.MaintenanceOccurrenceCreateNestedManyWithoutMaintenancePlanInput;
};
export type MaintenancePlanUncheckedCreateWithoutEquipmentInput = {
    id?: number;
    activity: string;
    instructions?: string | null;
    frequency: $Enums.MaintenanceFrequency;
    assignedTechnicianId?: number | null;
    lastCompletedAt?: Date | string | null;
    nextDueDate: Date | string;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    occurrences?: Prisma.MaintenanceOccurrenceUncheckedCreateNestedManyWithoutMaintenancePlanInput;
};
export type MaintenancePlanCreateOrConnectWithoutEquipmentInput = {
    where: Prisma.MaintenancePlanWhereUniqueInput;
    create: Prisma.XOR<Prisma.MaintenancePlanCreateWithoutEquipmentInput, Prisma.MaintenancePlanUncheckedCreateWithoutEquipmentInput>;
};
export type MaintenancePlanCreateManyEquipmentInputEnvelope = {
    data: Prisma.MaintenancePlanCreateManyEquipmentInput | Prisma.MaintenancePlanCreateManyEquipmentInput[];
    skipDuplicates?: boolean;
};
export type MaintenancePlanUpsertWithWhereUniqueWithoutEquipmentInput = {
    where: Prisma.MaintenancePlanWhereUniqueInput;
    update: Prisma.XOR<Prisma.MaintenancePlanUpdateWithoutEquipmentInput, Prisma.MaintenancePlanUncheckedUpdateWithoutEquipmentInput>;
    create: Prisma.XOR<Prisma.MaintenancePlanCreateWithoutEquipmentInput, Prisma.MaintenancePlanUncheckedCreateWithoutEquipmentInput>;
};
export type MaintenancePlanUpdateWithWhereUniqueWithoutEquipmentInput = {
    where: Prisma.MaintenancePlanWhereUniqueInput;
    data: Prisma.XOR<Prisma.MaintenancePlanUpdateWithoutEquipmentInput, Prisma.MaintenancePlanUncheckedUpdateWithoutEquipmentInput>;
};
export type MaintenancePlanUpdateManyWithWhereWithoutEquipmentInput = {
    where: Prisma.MaintenancePlanScalarWhereInput;
    data: Prisma.XOR<Prisma.MaintenancePlanUpdateManyMutationInput, Prisma.MaintenancePlanUncheckedUpdateManyWithoutEquipmentInput>;
};
export type MaintenancePlanCreateWithoutOccurrencesInput = {
    activity: string;
    instructions?: string | null;
    frequency: $Enums.MaintenanceFrequency;
    lastCompletedAt?: Date | string | null;
    nextDueDate: Date | string;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    equipment: Prisma.EquipmentCreateNestedOneWithoutMaintenancePlansInput;
    assignedTechnician?: Prisma.UserCreateNestedOneWithoutMaintenancePlansInput;
};
export type MaintenancePlanUncheckedCreateWithoutOccurrencesInput = {
    id?: number;
    equipmentId: number;
    activity: string;
    instructions?: string | null;
    frequency: $Enums.MaintenanceFrequency;
    assignedTechnicianId?: number | null;
    lastCompletedAt?: Date | string | null;
    nextDueDate: Date | string;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type MaintenancePlanCreateOrConnectWithoutOccurrencesInput = {
    where: Prisma.MaintenancePlanWhereUniqueInput;
    create: Prisma.XOR<Prisma.MaintenancePlanCreateWithoutOccurrencesInput, Prisma.MaintenancePlanUncheckedCreateWithoutOccurrencesInput>;
};
export type MaintenancePlanUpsertWithoutOccurrencesInput = {
    update: Prisma.XOR<Prisma.MaintenancePlanUpdateWithoutOccurrencesInput, Prisma.MaintenancePlanUncheckedUpdateWithoutOccurrencesInput>;
    create: Prisma.XOR<Prisma.MaintenancePlanCreateWithoutOccurrencesInput, Prisma.MaintenancePlanUncheckedCreateWithoutOccurrencesInput>;
    where?: Prisma.MaintenancePlanWhereInput;
};
export type MaintenancePlanUpdateToOneWithWhereWithoutOccurrencesInput = {
    where?: Prisma.MaintenancePlanWhereInput;
    data: Prisma.XOR<Prisma.MaintenancePlanUpdateWithoutOccurrencesInput, Prisma.MaintenancePlanUncheckedUpdateWithoutOccurrencesInput>;
};
export type MaintenancePlanUpdateWithoutOccurrencesInput = {
    activity?: Prisma.StringFieldUpdateOperationsInput | string;
    instructions?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    frequency?: Prisma.EnumMaintenanceFrequencyFieldUpdateOperationsInput | $Enums.MaintenanceFrequency;
    lastCompletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    nextDueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    equipment?: Prisma.EquipmentUpdateOneRequiredWithoutMaintenancePlansNestedInput;
    assignedTechnician?: Prisma.UserUpdateOneWithoutMaintenancePlansNestedInput;
};
export type MaintenancePlanUncheckedUpdateWithoutOccurrencesInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    equipmentId?: Prisma.IntFieldUpdateOperationsInput | number;
    activity?: Prisma.StringFieldUpdateOperationsInput | string;
    instructions?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    frequency?: Prisma.EnumMaintenanceFrequencyFieldUpdateOperationsInput | $Enums.MaintenanceFrequency;
    assignedTechnicianId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    lastCompletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    nextDueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MaintenancePlanCreateManyAssignedTechnicianInput = {
    id?: number;
    equipmentId: number;
    activity: string;
    instructions?: string | null;
    frequency: $Enums.MaintenanceFrequency;
    lastCompletedAt?: Date | string | null;
    nextDueDate: Date | string;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type MaintenancePlanUpdateWithoutAssignedTechnicianInput = {
    activity?: Prisma.StringFieldUpdateOperationsInput | string;
    instructions?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    frequency?: Prisma.EnumMaintenanceFrequencyFieldUpdateOperationsInput | $Enums.MaintenanceFrequency;
    lastCompletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    nextDueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    equipment?: Prisma.EquipmentUpdateOneRequiredWithoutMaintenancePlansNestedInput;
    occurrences?: Prisma.MaintenanceOccurrenceUpdateManyWithoutMaintenancePlanNestedInput;
};
export type MaintenancePlanUncheckedUpdateWithoutAssignedTechnicianInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    equipmentId?: Prisma.IntFieldUpdateOperationsInput | number;
    activity?: Prisma.StringFieldUpdateOperationsInput | string;
    instructions?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    frequency?: Prisma.EnumMaintenanceFrequencyFieldUpdateOperationsInput | $Enums.MaintenanceFrequency;
    lastCompletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    nextDueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    occurrences?: Prisma.MaintenanceOccurrenceUncheckedUpdateManyWithoutMaintenancePlanNestedInput;
};
export type MaintenancePlanUncheckedUpdateManyWithoutAssignedTechnicianInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    equipmentId?: Prisma.IntFieldUpdateOperationsInput | number;
    activity?: Prisma.StringFieldUpdateOperationsInput | string;
    instructions?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    frequency?: Prisma.EnumMaintenanceFrequencyFieldUpdateOperationsInput | $Enums.MaintenanceFrequency;
    lastCompletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    nextDueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MaintenancePlanCreateManyEquipmentInput = {
    id?: number;
    activity: string;
    instructions?: string | null;
    frequency: $Enums.MaintenanceFrequency;
    assignedTechnicianId?: number | null;
    lastCompletedAt?: Date | string | null;
    nextDueDate: Date | string;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type MaintenancePlanUpdateWithoutEquipmentInput = {
    activity?: Prisma.StringFieldUpdateOperationsInput | string;
    instructions?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    frequency?: Prisma.EnumMaintenanceFrequencyFieldUpdateOperationsInput | $Enums.MaintenanceFrequency;
    lastCompletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    nextDueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    assignedTechnician?: Prisma.UserUpdateOneWithoutMaintenancePlansNestedInput;
    occurrences?: Prisma.MaintenanceOccurrenceUpdateManyWithoutMaintenancePlanNestedInput;
};
export type MaintenancePlanUncheckedUpdateWithoutEquipmentInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    activity?: Prisma.StringFieldUpdateOperationsInput | string;
    instructions?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    frequency?: Prisma.EnumMaintenanceFrequencyFieldUpdateOperationsInput | $Enums.MaintenanceFrequency;
    assignedTechnicianId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    lastCompletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    nextDueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    occurrences?: Prisma.MaintenanceOccurrenceUncheckedUpdateManyWithoutMaintenancePlanNestedInput;
};
export type MaintenancePlanUncheckedUpdateManyWithoutEquipmentInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    activity?: Prisma.StringFieldUpdateOperationsInput | string;
    instructions?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    frequency?: Prisma.EnumMaintenanceFrequencyFieldUpdateOperationsInput | $Enums.MaintenanceFrequency;
    assignedTechnicianId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    lastCompletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    nextDueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
/**
 * Count Type MaintenancePlanCountOutputType
 */
export type MaintenancePlanCountOutputType = {
    occurrences: number;
};
export type MaintenancePlanCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    occurrences?: boolean | MaintenancePlanCountOutputTypeCountOccurrencesArgs;
};
/**
 * MaintenancePlanCountOutputType without action
 */
export type MaintenancePlanCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaintenancePlanCountOutputType
     */
    select?: Prisma.MaintenancePlanCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * MaintenancePlanCountOutputType without action
 */
export type MaintenancePlanCountOutputTypeCountOccurrencesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MaintenanceOccurrenceWhereInput;
};
export type MaintenancePlanSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    equipmentId?: boolean;
    activity?: boolean;
    instructions?: boolean;
    frequency?: boolean;
    assignedTechnicianId?: boolean;
    lastCompletedAt?: boolean;
    nextDueDate?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    equipment?: boolean | Prisma.EquipmentDefaultArgs<ExtArgs>;
    assignedTechnician?: boolean | Prisma.MaintenancePlan$assignedTechnicianArgs<ExtArgs>;
    occurrences?: boolean | Prisma.MaintenancePlan$occurrencesArgs<ExtArgs>;
    _count?: boolean | Prisma.MaintenancePlanCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["maintenancePlan"]>;
export type MaintenancePlanSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    equipmentId?: boolean;
    activity?: boolean;
    instructions?: boolean;
    frequency?: boolean;
    assignedTechnicianId?: boolean;
    lastCompletedAt?: boolean;
    nextDueDate?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    equipment?: boolean | Prisma.EquipmentDefaultArgs<ExtArgs>;
    assignedTechnician?: boolean | Prisma.MaintenancePlan$assignedTechnicianArgs<ExtArgs>;
}, ExtArgs["result"]["maintenancePlan"]>;
export type MaintenancePlanSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    equipmentId?: boolean;
    activity?: boolean;
    instructions?: boolean;
    frequency?: boolean;
    assignedTechnicianId?: boolean;
    lastCompletedAt?: boolean;
    nextDueDate?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    equipment?: boolean | Prisma.EquipmentDefaultArgs<ExtArgs>;
    assignedTechnician?: boolean | Prisma.MaintenancePlan$assignedTechnicianArgs<ExtArgs>;
}, ExtArgs["result"]["maintenancePlan"]>;
export type MaintenancePlanSelectScalar = {
    id?: boolean;
    equipmentId?: boolean;
    activity?: boolean;
    instructions?: boolean;
    frequency?: boolean;
    assignedTechnicianId?: boolean;
    lastCompletedAt?: boolean;
    nextDueDate?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type MaintenancePlanOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "equipmentId" | "activity" | "instructions" | "frequency" | "assignedTechnicianId" | "lastCompletedAt" | "nextDueDate" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["maintenancePlan"]>;
export type MaintenancePlanInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    equipment?: boolean | Prisma.EquipmentDefaultArgs<ExtArgs>;
    assignedTechnician?: boolean | Prisma.MaintenancePlan$assignedTechnicianArgs<ExtArgs>;
    occurrences?: boolean | Prisma.MaintenancePlan$occurrencesArgs<ExtArgs>;
    _count?: boolean | Prisma.MaintenancePlanCountOutputTypeDefaultArgs<ExtArgs>;
};
export type MaintenancePlanIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    equipment?: boolean | Prisma.EquipmentDefaultArgs<ExtArgs>;
    assignedTechnician?: boolean | Prisma.MaintenancePlan$assignedTechnicianArgs<ExtArgs>;
};
export type MaintenancePlanIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    equipment?: boolean | Prisma.EquipmentDefaultArgs<ExtArgs>;
    assignedTechnician?: boolean | Prisma.MaintenancePlan$assignedTechnicianArgs<ExtArgs>;
};
export type $MaintenancePlanPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "MaintenancePlan";
    objects: {
        equipment: Prisma.$EquipmentPayload<ExtArgs>;
        assignedTechnician: Prisma.$UserPayload<ExtArgs> | null;
        occurrences: Prisma.$MaintenanceOccurrencePayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        equipmentId: number;
        activity: string;
        instructions: string | null;
        frequency: $Enums.MaintenanceFrequency;
        assignedTechnicianId: number | null;
        lastCompletedAt: Date | null;
        nextDueDate: Date;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["maintenancePlan"]>;
    composites: {};
};
export type MaintenancePlanGetPayload<S extends boolean | null | undefined | MaintenancePlanDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$MaintenancePlanPayload, S>;
export type MaintenancePlanCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<MaintenancePlanFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: MaintenancePlanCountAggregateInputType | true;
};
export interface MaintenancePlanDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['MaintenancePlan'];
        meta: {
            name: 'MaintenancePlan';
        };
    };
    /**
     * Find zero or one MaintenancePlan that matches the filter.
     * @param {MaintenancePlanFindUniqueArgs} args - Arguments to find a MaintenancePlan
     * @example
     * // Get one MaintenancePlan
     * const maintenancePlan = await prisma.maintenancePlan.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MaintenancePlanFindUniqueArgs>(args: Prisma.SelectSubset<T, MaintenancePlanFindUniqueArgs<ExtArgs>>): Prisma.Prisma__MaintenancePlanClient<runtime.Types.Result.GetResult<Prisma.$MaintenancePlanPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one MaintenancePlan that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MaintenancePlanFindUniqueOrThrowArgs} args - Arguments to find a MaintenancePlan
     * @example
     * // Get one MaintenancePlan
     * const maintenancePlan = await prisma.maintenancePlan.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MaintenancePlanFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, MaintenancePlanFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__MaintenancePlanClient<runtime.Types.Result.GetResult<Prisma.$MaintenancePlanPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first MaintenancePlan that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaintenancePlanFindFirstArgs} args - Arguments to find a MaintenancePlan
     * @example
     * // Get one MaintenancePlan
     * const maintenancePlan = await prisma.maintenancePlan.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MaintenancePlanFindFirstArgs>(args?: Prisma.SelectSubset<T, MaintenancePlanFindFirstArgs<ExtArgs>>): Prisma.Prisma__MaintenancePlanClient<runtime.Types.Result.GetResult<Prisma.$MaintenancePlanPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first MaintenancePlan that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaintenancePlanFindFirstOrThrowArgs} args - Arguments to find a MaintenancePlan
     * @example
     * // Get one MaintenancePlan
     * const maintenancePlan = await prisma.maintenancePlan.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MaintenancePlanFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, MaintenancePlanFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__MaintenancePlanClient<runtime.Types.Result.GetResult<Prisma.$MaintenancePlanPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more MaintenancePlans that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaintenancePlanFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MaintenancePlans
     * const maintenancePlans = await prisma.maintenancePlan.findMany()
     *
     * // Get first 10 MaintenancePlans
     * const maintenancePlans = await prisma.maintenancePlan.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const maintenancePlanWithIdOnly = await prisma.maintenancePlan.findMany({ select: { id: true } })
     *
     */
    findMany<T extends MaintenancePlanFindManyArgs>(args?: Prisma.SelectSubset<T, MaintenancePlanFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MaintenancePlanPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a MaintenancePlan.
     * @param {MaintenancePlanCreateArgs} args - Arguments to create a MaintenancePlan.
     * @example
     * // Create one MaintenancePlan
     * const MaintenancePlan = await prisma.maintenancePlan.create({
     *   data: {
     *     // ... data to create a MaintenancePlan
     *   }
     * })
     *
     */
    create<T extends MaintenancePlanCreateArgs>(args: Prisma.SelectSubset<T, MaintenancePlanCreateArgs<ExtArgs>>): Prisma.Prisma__MaintenancePlanClient<runtime.Types.Result.GetResult<Prisma.$MaintenancePlanPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many MaintenancePlans.
     * @param {MaintenancePlanCreateManyArgs} args - Arguments to create many MaintenancePlans.
     * @example
     * // Create many MaintenancePlans
     * const maintenancePlan = await prisma.maintenancePlan.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends MaintenancePlanCreateManyArgs>(args?: Prisma.SelectSubset<T, MaintenancePlanCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many MaintenancePlans and returns the data saved in the database.
     * @param {MaintenancePlanCreateManyAndReturnArgs} args - Arguments to create many MaintenancePlans.
     * @example
     * // Create many MaintenancePlans
     * const maintenancePlan = await prisma.maintenancePlan.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many MaintenancePlans and only return the `id`
     * const maintenancePlanWithIdOnly = await prisma.maintenancePlan.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends MaintenancePlanCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, MaintenancePlanCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MaintenancePlanPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a MaintenancePlan.
     * @param {MaintenancePlanDeleteArgs} args - Arguments to delete one MaintenancePlan.
     * @example
     * // Delete one MaintenancePlan
     * const MaintenancePlan = await prisma.maintenancePlan.delete({
     *   where: {
     *     // ... filter to delete one MaintenancePlan
     *   }
     * })
     *
     */
    delete<T extends MaintenancePlanDeleteArgs>(args: Prisma.SelectSubset<T, MaintenancePlanDeleteArgs<ExtArgs>>): Prisma.Prisma__MaintenancePlanClient<runtime.Types.Result.GetResult<Prisma.$MaintenancePlanPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one MaintenancePlan.
     * @param {MaintenancePlanUpdateArgs} args - Arguments to update one MaintenancePlan.
     * @example
     * // Update one MaintenancePlan
     * const maintenancePlan = await prisma.maintenancePlan.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends MaintenancePlanUpdateArgs>(args: Prisma.SelectSubset<T, MaintenancePlanUpdateArgs<ExtArgs>>): Prisma.Prisma__MaintenancePlanClient<runtime.Types.Result.GetResult<Prisma.$MaintenancePlanPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more MaintenancePlans.
     * @param {MaintenancePlanDeleteManyArgs} args - Arguments to filter MaintenancePlans to delete.
     * @example
     * // Delete a few MaintenancePlans
     * const { count } = await prisma.maintenancePlan.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends MaintenancePlanDeleteManyArgs>(args?: Prisma.SelectSubset<T, MaintenancePlanDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more MaintenancePlans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaintenancePlanUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MaintenancePlans
     * const maintenancePlan = await prisma.maintenancePlan.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends MaintenancePlanUpdateManyArgs>(args: Prisma.SelectSubset<T, MaintenancePlanUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more MaintenancePlans and returns the data updated in the database.
     * @param {MaintenancePlanUpdateManyAndReturnArgs} args - Arguments to update many MaintenancePlans.
     * @example
     * // Update many MaintenancePlans
     * const maintenancePlan = await prisma.maintenancePlan.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more MaintenancePlans and only return the `id`
     * const maintenancePlanWithIdOnly = await prisma.maintenancePlan.updateManyAndReturn({
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
    updateManyAndReturn<T extends MaintenancePlanUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, MaintenancePlanUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MaintenancePlanPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one MaintenancePlan.
     * @param {MaintenancePlanUpsertArgs} args - Arguments to update or create a MaintenancePlan.
     * @example
     * // Update or create a MaintenancePlan
     * const maintenancePlan = await prisma.maintenancePlan.upsert({
     *   create: {
     *     // ... data to create a MaintenancePlan
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MaintenancePlan we want to update
     *   }
     * })
     */
    upsert<T extends MaintenancePlanUpsertArgs>(args: Prisma.SelectSubset<T, MaintenancePlanUpsertArgs<ExtArgs>>): Prisma.Prisma__MaintenancePlanClient<runtime.Types.Result.GetResult<Prisma.$MaintenancePlanPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of MaintenancePlans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaintenancePlanCountArgs} args - Arguments to filter MaintenancePlans to count.
     * @example
     * // Count the number of MaintenancePlans
     * const count = await prisma.maintenancePlan.count({
     *   where: {
     *     // ... the filter for the MaintenancePlans we want to count
     *   }
     * })
    **/
    count<T extends MaintenancePlanCountArgs>(args?: Prisma.Subset<T, MaintenancePlanCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], MaintenancePlanCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a MaintenancePlan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaintenancePlanAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends MaintenancePlanAggregateArgs>(args: Prisma.Subset<T, MaintenancePlanAggregateArgs>): Prisma.PrismaPromise<GetMaintenancePlanAggregateType<T>>;
    /**
     * Group by MaintenancePlan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaintenancePlanGroupByArgs} args - Group by arguments.
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
    groupBy<T extends MaintenancePlanGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: MaintenancePlanGroupByArgs['orderBy'];
    } : {
        orderBy?: MaintenancePlanGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, MaintenancePlanGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMaintenancePlanGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the MaintenancePlan model
     */
    readonly fields: MaintenancePlanFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for MaintenancePlan.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__MaintenancePlanClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    equipment<T extends Prisma.EquipmentDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.EquipmentDefaultArgs<ExtArgs>>): Prisma.Prisma__EquipmentClient<runtime.Types.Result.GetResult<Prisma.$EquipmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    assignedTechnician<T extends Prisma.MaintenancePlan$assignedTechnicianArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.MaintenancePlan$assignedTechnicianArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    occurrences<T extends Prisma.MaintenancePlan$occurrencesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.MaintenancePlan$occurrencesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MaintenanceOccurrencePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
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
 * Fields of the MaintenancePlan model
 */
export interface MaintenancePlanFieldRefs {
    readonly id: Prisma.FieldRef<"MaintenancePlan", 'Int'>;
    readonly equipmentId: Prisma.FieldRef<"MaintenancePlan", 'Int'>;
    readonly activity: Prisma.FieldRef<"MaintenancePlan", 'String'>;
    readonly instructions: Prisma.FieldRef<"MaintenancePlan", 'String'>;
    readonly frequency: Prisma.FieldRef<"MaintenancePlan", 'MaintenanceFrequency'>;
    readonly assignedTechnicianId: Prisma.FieldRef<"MaintenancePlan", 'Int'>;
    readonly lastCompletedAt: Prisma.FieldRef<"MaintenancePlan", 'DateTime'>;
    readonly nextDueDate: Prisma.FieldRef<"MaintenancePlan", 'DateTime'>;
    readonly isActive: Prisma.FieldRef<"MaintenancePlan", 'Boolean'>;
    readonly createdAt: Prisma.FieldRef<"MaintenancePlan", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"MaintenancePlan", 'DateTime'>;
}
/**
 * MaintenancePlan findUnique
 */
export type MaintenancePlanFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaintenancePlan
     */
    select?: Prisma.MaintenancePlanSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MaintenancePlan
     */
    omit?: Prisma.MaintenancePlanOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MaintenancePlanInclude<ExtArgs> | null;
    /**
     * Filter, which MaintenancePlan to fetch.
     */
    where: Prisma.MaintenancePlanWhereUniqueInput;
};
/**
 * MaintenancePlan findUniqueOrThrow
 */
export type MaintenancePlanFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaintenancePlan
     */
    select?: Prisma.MaintenancePlanSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MaintenancePlan
     */
    omit?: Prisma.MaintenancePlanOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MaintenancePlanInclude<ExtArgs> | null;
    /**
     * Filter, which MaintenancePlan to fetch.
     */
    where: Prisma.MaintenancePlanWhereUniqueInput;
};
/**
 * MaintenancePlan findFirst
 */
export type MaintenancePlanFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaintenancePlan
     */
    select?: Prisma.MaintenancePlanSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MaintenancePlan
     */
    omit?: Prisma.MaintenancePlanOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MaintenancePlanInclude<ExtArgs> | null;
    /**
     * Filter, which MaintenancePlan to fetch.
     */
    where?: Prisma.MaintenancePlanWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of MaintenancePlans to fetch.
     */
    orderBy?: Prisma.MaintenancePlanOrderByWithRelationInput | Prisma.MaintenancePlanOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for MaintenancePlans.
     */
    cursor?: Prisma.MaintenancePlanWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` MaintenancePlans from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` MaintenancePlans.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of MaintenancePlans.
     */
    distinct?: Prisma.MaintenancePlanScalarFieldEnum | Prisma.MaintenancePlanScalarFieldEnum[];
};
/**
 * MaintenancePlan findFirstOrThrow
 */
export type MaintenancePlanFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaintenancePlan
     */
    select?: Prisma.MaintenancePlanSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MaintenancePlan
     */
    omit?: Prisma.MaintenancePlanOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MaintenancePlanInclude<ExtArgs> | null;
    /**
     * Filter, which MaintenancePlan to fetch.
     */
    where?: Prisma.MaintenancePlanWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of MaintenancePlans to fetch.
     */
    orderBy?: Prisma.MaintenancePlanOrderByWithRelationInput | Prisma.MaintenancePlanOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for MaintenancePlans.
     */
    cursor?: Prisma.MaintenancePlanWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` MaintenancePlans from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` MaintenancePlans.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of MaintenancePlans.
     */
    distinct?: Prisma.MaintenancePlanScalarFieldEnum | Prisma.MaintenancePlanScalarFieldEnum[];
};
/**
 * MaintenancePlan findMany
 */
export type MaintenancePlanFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaintenancePlan
     */
    select?: Prisma.MaintenancePlanSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MaintenancePlan
     */
    omit?: Prisma.MaintenancePlanOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MaintenancePlanInclude<ExtArgs> | null;
    /**
     * Filter, which MaintenancePlans to fetch.
     */
    where?: Prisma.MaintenancePlanWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of MaintenancePlans to fetch.
     */
    orderBy?: Prisma.MaintenancePlanOrderByWithRelationInput | Prisma.MaintenancePlanOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing MaintenancePlans.
     */
    cursor?: Prisma.MaintenancePlanWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` MaintenancePlans from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` MaintenancePlans.
     */
    skip?: number;
    distinct?: Prisma.MaintenancePlanScalarFieldEnum | Prisma.MaintenancePlanScalarFieldEnum[];
};
/**
 * MaintenancePlan create
 */
export type MaintenancePlanCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaintenancePlan
     */
    select?: Prisma.MaintenancePlanSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MaintenancePlan
     */
    omit?: Prisma.MaintenancePlanOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MaintenancePlanInclude<ExtArgs> | null;
    /**
     * The data needed to create a MaintenancePlan.
     */
    data: Prisma.XOR<Prisma.MaintenancePlanCreateInput, Prisma.MaintenancePlanUncheckedCreateInput>;
};
/**
 * MaintenancePlan createMany
 */
export type MaintenancePlanCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many MaintenancePlans.
     */
    data: Prisma.MaintenancePlanCreateManyInput | Prisma.MaintenancePlanCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * MaintenancePlan createManyAndReturn
 */
export type MaintenancePlanCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaintenancePlan
     */
    select?: Prisma.MaintenancePlanSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the MaintenancePlan
     */
    omit?: Prisma.MaintenancePlanOmit<ExtArgs> | null;
    /**
     * The data used to create many MaintenancePlans.
     */
    data: Prisma.MaintenancePlanCreateManyInput | Prisma.MaintenancePlanCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MaintenancePlanIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * MaintenancePlan update
 */
export type MaintenancePlanUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaintenancePlan
     */
    select?: Prisma.MaintenancePlanSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MaintenancePlan
     */
    omit?: Prisma.MaintenancePlanOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MaintenancePlanInclude<ExtArgs> | null;
    /**
     * The data needed to update a MaintenancePlan.
     */
    data: Prisma.XOR<Prisma.MaintenancePlanUpdateInput, Prisma.MaintenancePlanUncheckedUpdateInput>;
    /**
     * Choose, which MaintenancePlan to update.
     */
    where: Prisma.MaintenancePlanWhereUniqueInput;
};
/**
 * MaintenancePlan updateMany
 */
export type MaintenancePlanUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update MaintenancePlans.
     */
    data: Prisma.XOR<Prisma.MaintenancePlanUpdateManyMutationInput, Prisma.MaintenancePlanUncheckedUpdateManyInput>;
    /**
     * Filter which MaintenancePlans to update
     */
    where?: Prisma.MaintenancePlanWhereInput;
    /**
     * Limit how many MaintenancePlans to update.
     */
    limit?: number;
};
/**
 * MaintenancePlan updateManyAndReturn
 */
export type MaintenancePlanUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaintenancePlan
     */
    select?: Prisma.MaintenancePlanSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the MaintenancePlan
     */
    omit?: Prisma.MaintenancePlanOmit<ExtArgs> | null;
    /**
     * The data used to update MaintenancePlans.
     */
    data: Prisma.XOR<Prisma.MaintenancePlanUpdateManyMutationInput, Prisma.MaintenancePlanUncheckedUpdateManyInput>;
    /**
     * Filter which MaintenancePlans to update
     */
    where?: Prisma.MaintenancePlanWhereInput;
    /**
     * Limit how many MaintenancePlans to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MaintenancePlanIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * MaintenancePlan upsert
 */
export type MaintenancePlanUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaintenancePlan
     */
    select?: Prisma.MaintenancePlanSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MaintenancePlan
     */
    omit?: Prisma.MaintenancePlanOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MaintenancePlanInclude<ExtArgs> | null;
    /**
     * The filter to search for the MaintenancePlan to update in case it exists.
     */
    where: Prisma.MaintenancePlanWhereUniqueInput;
    /**
     * In case the MaintenancePlan found by the `where` argument doesn't exist, create a new MaintenancePlan with this data.
     */
    create: Prisma.XOR<Prisma.MaintenancePlanCreateInput, Prisma.MaintenancePlanUncheckedCreateInput>;
    /**
     * In case the MaintenancePlan was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.MaintenancePlanUpdateInput, Prisma.MaintenancePlanUncheckedUpdateInput>;
};
/**
 * MaintenancePlan delete
 */
export type MaintenancePlanDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaintenancePlan
     */
    select?: Prisma.MaintenancePlanSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MaintenancePlan
     */
    omit?: Prisma.MaintenancePlanOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MaintenancePlanInclude<ExtArgs> | null;
    /**
     * Filter which MaintenancePlan to delete.
     */
    where: Prisma.MaintenancePlanWhereUniqueInput;
};
/**
 * MaintenancePlan deleteMany
 */
export type MaintenancePlanDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which MaintenancePlans to delete
     */
    where?: Prisma.MaintenancePlanWhereInput;
    /**
     * Limit how many MaintenancePlans to delete.
     */
    limit?: number;
};
/**
 * MaintenancePlan.assignedTechnician
 */
export type MaintenancePlan$assignedTechnicianArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * MaintenancePlan.occurrences
 */
export type MaintenancePlan$occurrencesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    orderBy?: Prisma.MaintenanceOccurrenceOrderByWithRelationInput | Prisma.MaintenanceOccurrenceOrderByWithRelationInput[];
    cursor?: Prisma.MaintenanceOccurrenceWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.MaintenanceOccurrenceScalarFieldEnum | Prisma.MaintenanceOccurrenceScalarFieldEnum[];
};
/**
 * MaintenancePlan without action
 */
export type MaintenancePlanDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaintenancePlan
     */
    select?: Prisma.MaintenancePlanSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MaintenancePlan
     */
    omit?: Prisma.MaintenancePlanOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MaintenancePlanInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=MaintenancePlan.d.ts.map