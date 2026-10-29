import type * as runtime from "@prisma/client/runtime/library";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model Equipment
 *
 */
export type EquipmentModel = runtime.Types.Result.DefaultSelection<Prisma.$EquipmentPayload>;
export type AggregateEquipment = {
    _count: EquipmentCountAggregateOutputType | null;
    _avg: EquipmentAvgAggregateOutputType | null;
    _sum: EquipmentSumAggregateOutputType | null;
    _min: EquipmentMinAggregateOutputType | null;
    _max: EquipmentMaxAggregateOutputType | null;
};
export type EquipmentAvgAggregateOutputType = {
    id: number | null;
    departmentId: number | null;
    locationId: number | null;
    categoryId: number | null;
};
export type EquipmentSumAggregateOutputType = {
    id: number | null;
    departmentId: number | null;
    locationId: number | null;
    categoryId: number | null;
};
export type EquipmentMinAggregateOutputType = {
    id: number | null;
    code: string | null;
    serialNumber: string | null;
    name: string | null;
    description: string | null;
    status: $Enums.EquipmentStatus | null;
    criticality: $Enums.Criticality | null;
    departmentId: number | null;
    locationId: number | null;
    categoryId: number | null;
    isDeactivated: boolean | null;
    deactivatedAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type EquipmentMaxAggregateOutputType = {
    id: number | null;
    code: string | null;
    serialNumber: string | null;
    name: string | null;
    description: string | null;
    status: $Enums.EquipmentStatus | null;
    criticality: $Enums.Criticality | null;
    departmentId: number | null;
    locationId: number | null;
    categoryId: number | null;
    isDeactivated: boolean | null;
    deactivatedAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type EquipmentCountAggregateOutputType = {
    id: number;
    code: number;
    serialNumber: number;
    name: number;
    description: number;
    status: number;
    criticality: number;
    departmentId: number;
    locationId: number;
    categoryId: number;
    isDeactivated: number;
    deactivatedAt: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type EquipmentAvgAggregateInputType = {
    id?: true;
    departmentId?: true;
    locationId?: true;
    categoryId?: true;
};
export type EquipmentSumAggregateInputType = {
    id?: true;
    departmentId?: true;
    locationId?: true;
    categoryId?: true;
};
export type EquipmentMinAggregateInputType = {
    id?: true;
    code?: true;
    serialNumber?: true;
    name?: true;
    description?: true;
    status?: true;
    criticality?: true;
    departmentId?: true;
    locationId?: true;
    categoryId?: true;
    isDeactivated?: true;
    deactivatedAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type EquipmentMaxAggregateInputType = {
    id?: true;
    code?: true;
    serialNumber?: true;
    name?: true;
    description?: true;
    status?: true;
    criticality?: true;
    departmentId?: true;
    locationId?: true;
    categoryId?: true;
    isDeactivated?: true;
    deactivatedAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type EquipmentCountAggregateInputType = {
    id?: true;
    code?: true;
    serialNumber?: true;
    name?: true;
    description?: true;
    status?: true;
    criticality?: true;
    departmentId?: true;
    locationId?: true;
    categoryId?: true;
    isDeactivated?: true;
    deactivatedAt?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type EquipmentAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Equipment to aggregate.
     */
    where?: Prisma.EquipmentWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Equipment to fetch.
     */
    orderBy?: Prisma.EquipmentOrderByWithRelationInput | Prisma.EquipmentOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.EquipmentWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Equipment from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Equipment.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Equipment
    **/
    _count?: true | EquipmentCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: EquipmentAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: EquipmentSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: EquipmentMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: EquipmentMaxAggregateInputType;
};
export type GetEquipmentAggregateType<T extends EquipmentAggregateArgs> = {
    [P in keyof T & keyof AggregateEquipment]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateEquipment[P]> : Prisma.GetScalarType<T[P], AggregateEquipment[P]>;
};
export type EquipmentGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.EquipmentWhereInput;
    orderBy?: Prisma.EquipmentOrderByWithAggregationInput | Prisma.EquipmentOrderByWithAggregationInput[];
    by: Prisma.EquipmentScalarFieldEnum[] | Prisma.EquipmentScalarFieldEnum;
    having?: Prisma.EquipmentScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: EquipmentCountAggregateInputType | true;
    _avg?: EquipmentAvgAggregateInputType;
    _sum?: EquipmentSumAggregateInputType;
    _min?: EquipmentMinAggregateInputType;
    _max?: EquipmentMaxAggregateInputType;
};
export type EquipmentGroupByOutputType = {
    id: number;
    code: string;
    serialNumber: string | null;
    name: string;
    description: string | null;
    status: $Enums.EquipmentStatus;
    criticality: $Enums.Criticality;
    departmentId: number;
    locationId: number;
    categoryId: number;
    isDeactivated: boolean;
    deactivatedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    _count: EquipmentCountAggregateOutputType | null;
    _avg: EquipmentAvgAggregateOutputType | null;
    _sum: EquipmentSumAggregateOutputType | null;
    _min: EquipmentMinAggregateOutputType | null;
    _max: EquipmentMaxAggregateOutputType | null;
};
type GetEquipmentGroupByPayload<T extends EquipmentGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<EquipmentGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof EquipmentGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], EquipmentGroupByOutputType[P]> : Prisma.GetScalarType<T[P], EquipmentGroupByOutputType[P]>;
}>>;
export type EquipmentWhereInput = {
    AND?: Prisma.EquipmentWhereInput | Prisma.EquipmentWhereInput[];
    OR?: Prisma.EquipmentWhereInput[];
    NOT?: Prisma.EquipmentWhereInput | Prisma.EquipmentWhereInput[];
    id?: Prisma.IntFilter<"Equipment"> | number;
    code?: Prisma.StringFilter<"Equipment"> | string;
    serialNumber?: Prisma.StringNullableFilter<"Equipment"> | string | null;
    name?: Prisma.StringFilter<"Equipment"> | string;
    description?: Prisma.StringNullableFilter<"Equipment"> | string | null;
    status?: Prisma.EnumEquipmentStatusFilter<"Equipment"> | $Enums.EquipmentStatus;
    criticality?: Prisma.EnumCriticalityFilter<"Equipment"> | $Enums.Criticality;
    departmentId?: Prisma.IntFilter<"Equipment"> | number;
    locationId?: Prisma.IntFilter<"Equipment"> | number;
    categoryId?: Prisma.IntFilter<"Equipment"> | number;
    isDeactivated?: Prisma.BoolFilter<"Equipment"> | boolean;
    deactivatedAt?: Prisma.DateTimeNullableFilter<"Equipment"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"Equipment"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Equipment"> | Date | string;
    department?: Prisma.XOR<Prisma.DepartmentScalarRelationFilter, Prisma.DepartmentWhereInput>;
    location?: Prisma.XOR<Prisma.LocationScalarRelationFilter, Prisma.LocationWhereInput>;
    category?: Prisma.XOR<Prisma.EquipmentCategoryScalarRelationFilter, Prisma.EquipmentCategoryWhereInput>;
    locationHistory?: Prisma.EquipmentLocationHistoryListRelationFilter;
};
export type EquipmentOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    serialNumber?: Prisma.SortOrderInput | Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    criticality?: Prisma.SortOrder;
    departmentId?: Prisma.SortOrder;
    locationId?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
    isDeactivated?: Prisma.SortOrder;
    deactivatedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    department?: Prisma.DepartmentOrderByWithRelationInput;
    location?: Prisma.LocationOrderByWithRelationInput;
    category?: Prisma.EquipmentCategoryOrderByWithRelationInput;
    locationHistory?: Prisma.EquipmentLocationHistoryOrderByRelationAggregateInput;
};
export type EquipmentWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    code?: string;
    AND?: Prisma.EquipmentWhereInput | Prisma.EquipmentWhereInput[];
    OR?: Prisma.EquipmentWhereInput[];
    NOT?: Prisma.EquipmentWhereInput | Prisma.EquipmentWhereInput[];
    serialNumber?: Prisma.StringNullableFilter<"Equipment"> | string | null;
    name?: Prisma.StringFilter<"Equipment"> | string;
    description?: Prisma.StringNullableFilter<"Equipment"> | string | null;
    status?: Prisma.EnumEquipmentStatusFilter<"Equipment"> | $Enums.EquipmentStatus;
    criticality?: Prisma.EnumCriticalityFilter<"Equipment"> | $Enums.Criticality;
    departmentId?: Prisma.IntFilter<"Equipment"> | number;
    locationId?: Prisma.IntFilter<"Equipment"> | number;
    categoryId?: Prisma.IntFilter<"Equipment"> | number;
    isDeactivated?: Prisma.BoolFilter<"Equipment"> | boolean;
    deactivatedAt?: Prisma.DateTimeNullableFilter<"Equipment"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"Equipment"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Equipment"> | Date | string;
    department?: Prisma.XOR<Prisma.DepartmentScalarRelationFilter, Prisma.DepartmentWhereInput>;
    location?: Prisma.XOR<Prisma.LocationScalarRelationFilter, Prisma.LocationWhereInput>;
    category?: Prisma.XOR<Prisma.EquipmentCategoryScalarRelationFilter, Prisma.EquipmentCategoryWhereInput>;
    locationHistory?: Prisma.EquipmentLocationHistoryListRelationFilter;
}, "id" | "code">;
export type EquipmentOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    serialNumber?: Prisma.SortOrderInput | Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    criticality?: Prisma.SortOrder;
    departmentId?: Prisma.SortOrder;
    locationId?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
    isDeactivated?: Prisma.SortOrder;
    deactivatedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.EquipmentCountOrderByAggregateInput;
    _avg?: Prisma.EquipmentAvgOrderByAggregateInput;
    _max?: Prisma.EquipmentMaxOrderByAggregateInput;
    _min?: Prisma.EquipmentMinOrderByAggregateInput;
    _sum?: Prisma.EquipmentSumOrderByAggregateInput;
};
export type EquipmentScalarWhereWithAggregatesInput = {
    AND?: Prisma.EquipmentScalarWhereWithAggregatesInput | Prisma.EquipmentScalarWhereWithAggregatesInput[];
    OR?: Prisma.EquipmentScalarWhereWithAggregatesInput[];
    NOT?: Prisma.EquipmentScalarWhereWithAggregatesInput | Prisma.EquipmentScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"Equipment"> | number;
    code?: Prisma.StringWithAggregatesFilter<"Equipment"> | string;
    serialNumber?: Prisma.StringNullableWithAggregatesFilter<"Equipment"> | string | null;
    name?: Prisma.StringWithAggregatesFilter<"Equipment"> | string;
    description?: Prisma.StringNullableWithAggregatesFilter<"Equipment"> | string | null;
    status?: Prisma.EnumEquipmentStatusWithAggregatesFilter<"Equipment"> | $Enums.EquipmentStatus;
    criticality?: Prisma.EnumCriticalityWithAggregatesFilter<"Equipment"> | $Enums.Criticality;
    departmentId?: Prisma.IntWithAggregatesFilter<"Equipment"> | number;
    locationId?: Prisma.IntWithAggregatesFilter<"Equipment"> | number;
    categoryId?: Prisma.IntWithAggregatesFilter<"Equipment"> | number;
    isDeactivated?: Prisma.BoolWithAggregatesFilter<"Equipment"> | boolean;
    deactivatedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Equipment"> | Date | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Equipment"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Equipment"> | Date | string;
};
export type EquipmentCreateInput = {
    code: string;
    serialNumber?: string | null;
    name: string;
    description?: string | null;
    status?: $Enums.EquipmentStatus;
    criticality: $Enums.Criticality;
    isDeactivated?: boolean;
    deactivatedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    department: Prisma.DepartmentCreateNestedOneWithoutEquipmentInput;
    location: Prisma.LocationCreateNestedOneWithoutEquipmentInput;
    category: Prisma.EquipmentCategoryCreateNestedOneWithoutEquipmentInput;
    locationHistory?: Prisma.EquipmentLocationHistoryCreateNestedManyWithoutEquipmentInput;
};
export type EquipmentUncheckedCreateInput = {
    id?: number;
    code: string;
    serialNumber?: string | null;
    name: string;
    description?: string | null;
    status?: $Enums.EquipmentStatus;
    criticality: $Enums.Criticality;
    departmentId: number;
    locationId: number;
    categoryId: number;
    isDeactivated?: boolean;
    deactivatedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    locationHistory?: Prisma.EquipmentLocationHistoryUncheckedCreateNestedManyWithoutEquipmentInput;
};
export type EquipmentUpdateInput = {
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    serialNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumEquipmentStatusFieldUpdateOperationsInput | $Enums.EquipmentStatus;
    criticality?: Prisma.EnumCriticalityFieldUpdateOperationsInput | $Enums.Criticality;
    isDeactivated?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    deactivatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    department?: Prisma.DepartmentUpdateOneRequiredWithoutEquipmentNestedInput;
    location?: Prisma.LocationUpdateOneRequiredWithoutEquipmentNestedInput;
    category?: Prisma.EquipmentCategoryUpdateOneRequiredWithoutEquipmentNestedInput;
    locationHistory?: Prisma.EquipmentLocationHistoryUpdateManyWithoutEquipmentNestedInput;
};
export type EquipmentUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    serialNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumEquipmentStatusFieldUpdateOperationsInput | $Enums.EquipmentStatus;
    criticality?: Prisma.EnumCriticalityFieldUpdateOperationsInput | $Enums.Criticality;
    departmentId?: Prisma.IntFieldUpdateOperationsInput | number;
    locationId?: Prisma.IntFieldUpdateOperationsInput | number;
    categoryId?: Prisma.IntFieldUpdateOperationsInput | number;
    isDeactivated?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    deactivatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    locationHistory?: Prisma.EquipmentLocationHistoryUncheckedUpdateManyWithoutEquipmentNestedInput;
};
export type EquipmentCreateManyInput = {
    id?: number;
    code: string;
    serialNumber?: string | null;
    name: string;
    description?: string | null;
    status?: $Enums.EquipmentStatus;
    criticality: $Enums.Criticality;
    departmentId: number;
    locationId: number;
    categoryId: number;
    isDeactivated?: boolean;
    deactivatedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type EquipmentUpdateManyMutationInput = {
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    serialNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumEquipmentStatusFieldUpdateOperationsInput | $Enums.EquipmentStatus;
    criticality?: Prisma.EnumCriticalityFieldUpdateOperationsInput | $Enums.Criticality;
    isDeactivated?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    deactivatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type EquipmentUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    serialNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumEquipmentStatusFieldUpdateOperationsInput | $Enums.EquipmentStatus;
    criticality?: Prisma.EnumCriticalityFieldUpdateOperationsInput | $Enums.Criticality;
    departmentId?: Prisma.IntFieldUpdateOperationsInput | number;
    locationId?: Prisma.IntFieldUpdateOperationsInput | number;
    categoryId?: Prisma.IntFieldUpdateOperationsInput | number;
    isDeactivated?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    deactivatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type EquipmentListRelationFilter = {
    every?: Prisma.EquipmentWhereInput;
    some?: Prisma.EquipmentWhereInput;
    none?: Prisma.EquipmentWhereInput;
};
export type EquipmentOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type EquipmentCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    serialNumber?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    criticality?: Prisma.SortOrder;
    departmentId?: Prisma.SortOrder;
    locationId?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
    isDeactivated?: Prisma.SortOrder;
    deactivatedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type EquipmentAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    departmentId?: Prisma.SortOrder;
    locationId?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
};
export type EquipmentMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    serialNumber?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    criticality?: Prisma.SortOrder;
    departmentId?: Prisma.SortOrder;
    locationId?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
    isDeactivated?: Prisma.SortOrder;
    deactivatedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type EquipmentMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    serialNumber?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    criticality?: Prisma.SortOrder;
    departmentId?: Prisma.SortOrder;
    locationId?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
    isDeactivated?: Prisma.SortOrder;
    deactivatedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type EquipmentSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    departmentId?: Prisma.SortOrder;
    locationId?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
};
export type EquipmentScalarRelationFilter = {
    is?: Prisma.EquipmentWhereInput;
    isNot?: Prisma.EquipmentWhereInput;
};
export type EquipmentCreateNestedManyWithoutDepartmentInput = {
    create?: Prisma.XOR<Prisma.EquipmentCreateWithoutDepartmentInput, Prisma.EquipmentUncheckedCreateWithoutDepartmentInput> | Prisma.EquipmentCreateWithoutDepartmentInput[] | Prisma.EquipmentUncheckedCreateWithoutDepartmentInput[];
    connectOrCreate?: Prisma.EquipmentCreateOrConnectWithoutDepartmentInput | Prisma.EquipmentCreateOrConnectWithoutDepartmentInput[];
    createMany?: Prisma.EquipmentCreateManyDepartmentInputEnvelope;
    connect?: Prisma.EquipmentWhereUniqueInput | Prisma.EquipmentWhereUniqueInput[];
};
export type EquipmentUncheckedCreateNestedManyWithoutDepartmentInput = {
    create?: Prisma.XOR<Prisma.EquipmentCreateWithoutDepartmentInput, Prisma.EquipmentUncheckedCreateWithoutDepartmentInput> | Prisma.EquipmentCreateWithoutDepartmentInput[] | Prisma.EquipmentUncheckedCreateWithoutDepartmentInput[];
    connectOrCreate?: Prisma.EquipmentCreateOrConnectWithoutDepartmentInput | Prisma.EquipmentCreateOrConnectWithoutDepartmentInput[];
    createMany?: Prisma.EquipmentCreateManyDepartmentInputEnvelope;
    connect?: Prisma.EquipmentWhereUniqueInput | Prisma.EquipmentWhereUniqueInput[];
};
export type EquipmentUpdateManyWithoutDepartmentNestedInput = {
    create?: Prisma.XOR<Prisma.EquipmentCreateWithoutDepartmentInput, Prisma.EquipmentUncheckedCreateWithoutDepartmentInput> | Prisma.EquipmentCreateWithoutDepartmentInput[] | Prisma.EquipmentUncheckedCreateWithoutDepartmentInput[];
    connectOrCreate?: Prisma.EquipmentCreateOrConnectWithoutDepartmentInput | Prisma.EquipmentCreateOrConnectWithoutDepartmentInput[];
    upsert?: Prisma.EquipmentUpsertWithWhereUniqueWithoutDepartmentInput | Prisma.EquipmentUpsertWithWhereUniqueWithoutDepartmentInput[];
    createMany?: Prisma.EquipmentCreateManyDepartmentInputEnvelope;
    set?: Prisma.EquipmentWhereUniqueInput | Prisma.EquipmentWhereUniqueInput[];
    disconnect?: Prisma.EquipmentWhereUniqueInput | Prisma.EquipmentWhereUniqueInput[];
    delete?: Prisma.EquipmentWhereUniqueInput | Prisma.EquipmentWhereUniqueInput[];
    connect?: Prisma.EquipmentWhereUniqueInput | Prisma.EquipmentWhereUniqueInput[];
    update?: Prisma.EquipmentUpdateWithWhereUniqueWithoutDepartmentInput | Prisma.EquipmentUpdateWithWhereUniqueWithoutDepartmentInput[];
    updateMany?: Prisma.EquipmentUpdateManyWithWhereWithoutDepartmentInput | Prisma.EquipmentUpdateManyWithWhereWithoutDepartmentInput[];
    deleteMany?: Prisma.EquipmentScalarWhereInput | Prisma.EquipmentScalarWhereInput[];
};
export type EquipmentUncheckedUpdateManyWithoutDepartmentNestedInput = {
    create?: Prisma.XOR<Prisma.EquipmentCreateWithoutDepartmentInput, Prisma.EquipmentUncheckedCreateWithoutDepartmentInput> | Prisma.EquipmentCreateWithoutDepartmentInput[] | Prisma.EquipmentUncheckedCreateWithoutDepartmentInput[];
    connectOrCreate?: Prisma.EquipmentCreateOrConnectWithoutDepartmentInput | Prisma.EquipmentCreateOrConnectWithoutDepartmentInput[];
    upsert?: Prisma.EquipmentUpsertWithWhereUniqueWithoutDepartmentInput | Prisma.EquipmentUpsertWithWhereUniqueWithoutDepartmentInput[];
    createMany?: Prisma.EquipmentCreateManyDepartmentInputEnvelope;
    set?: Prisma.EquipmentWhereUniqueInput | Prisma.EquipmentWhereUniqueInput[];
    disconnect?: Prisma.EquipmentWhereUniqueInput | Prisma.EquipmentWhereUniqueInput[];
    delete?: Prisma.EquipmentWhereUniqueInput | Prisma.EquipmentWhereUniqueInput[];
    connect?: Prisma.EquipmentWhereUniqueInput | Prisma.EquipmentWhereUniqueInput[];
    update?: Prisma.EquipmentUpdateWithWhereUniqueWithoutDepartmentInput | Prisma.EquipmentUpdateWithWhereUniqueWithoutDepartmentInput[];
    updateMany?: Prisma.EquipmentUpdateManyWithWhereWithoutDepartmentInput | Prisma.EquipmentUpdateManyWithWhereWithoutDepartmentInput[];
    deleteMany?: Prisma.EquipmentScalarWhereInput | Prisma.EquipmentScalarWhereInput[];
};
export type EquipmentCreateNestedManyWithoutLocationInput = {
    create?: Prisma.XOR<Prisma.EquipmentCreateWithoutLocationInput, Prisma.EquipmentUncheckedCreateWithoutLocationInput> | Prisma.EquipmentCreateWithoutLocationInput[] | Prisma.EquipmentUncheckedCreateWithoutLocationInput[];
    connectOrCreate?: Prisma.EquipmentCreateOrConnectWithoutLocationInput | Prisma.EquipmentCreateOrConnectWithoutLocationInput[];
    createMany?: Prisma.EquipmentCreateManyLocationInputEnvelope;
    connect?: Prisma.EquipmentWhereUniqueInput | Prisma.EquipmentWhereUniqueInput[];
};
export type EquipmentUncheckedCreateNestedManyWithoutLocationInput = {
    create?: Prisma.XOR<Prisma.EquipmentCreateWithoutLocationInput, Prisma.EquipmentUncheckedCreateWithoutLocationInput> | Prisma.EquipmentCreateWithoutLocationInput[] | Prisma.EquipmentUncheckedCreateWithoutLocationInput[];
    connectOrCreate?: Prisma.EquipmentCreateOrConnectWithoutLocationInput | Prisma.EquipmentCreateOrConnectWithoutLocationInput[];
    createMany?: Prisma.EquipmentCreateManyLocationInputEnvelope;
    connect?: Prisma.EquipmentWhereUniqueInput | Prisma.EquipmentWhereUniqueInput[];
};
export type EquipmentUpdateManyWithoutLocationNestedInput = {
    create?: Prisma.XOR<Prisma.EquipmentCreateWithoutLocationInput, Prisma.EquipmentUncheckedCreateWithoutLocationInput> | Prisma.EquipmentCreateWithoutLocationInput[] | Prisma.EquipmentUncheckedCreateWithoutLocationInput[];
    connectOrCreate?: Prisma.EquipmentCreateOrConnectWithoutLocationInput | Prisma.EquipmentCreateOrConnectWithoutLocationInput[];
    upsert?: Prisma.EquipmentUpsertWithWhereUniqueWithoutLocationInput | Prisma.EquipmentUpsertWithWhereUniqueWithoutLocationInput[];
    createMany?: Prisma.EquipmentCreateManyLocationInputEnvelope;
    set?: Prisma.EquipmentWhereUniqueInput | Prisma.EquipmentWhereUniqueInput[];
    disconnect?: Prisma.EquipmentWhereUniqueInput | Prisma.EquipmentWhereUniqueInput[];
    delete?: Prisma.EquipmentWhereUniqueInput | Prisma.EquipmentWhereUniqueInput[];
    connect?: Prisma.EquipmentWhereUniqueInput | Prisma.EquipmentWhereUniqueInput[];
    update?: Prisma.EquipmentUpdateWithWhereUniqueWithoutLocationInput | Prisma.EquipmentUpdateWithWhereUniqueWithoutLocationInput[];
    updateMany?: Prisma.EquipmentUpdateManyWithWhereWithoutLocationInput | Prisma.EquipmentUpdateManyWithWhereWithoutLocationInput[];
    deleteMany?: Prisma.EquipmentScalarWhereInput | Prisma.EquipmentScalarWhereInput[];
};
export type EquipmentUncheckedUpdateManyWithoutLocationNestedInput = {
    create?: Prisma.XOR<Prisma.EquipmentCreateWithoutLocationInput, Prisma.EquipmentUncheckedCreateWithoutLocationInput> | Prisma.EquipmentCreateWithoutLocationInput[] | Prisma.EquipmentUncheckedCreateWithoutLocationInput[];
    connectOrCreate?: Prisma.EquipmentCreateOrConnectWithoutLocationInput | Prisma.EquipmentCreateOrConnectWithoutLocationInput[];
    upsert?: Prisma.EquipmentUpsertWithWhereUniqueWithoutLocationInput | Prisma.EquipmentUpsertWithWhereUniqueWithoutLocationInput[];
    createMany?: Prisma.EquipmentCreateManyLocationInputEnvelope;
    set?: Prisma.EquipmentWhereUniqueInput | Prisma.EquipmentWhereUniqueInput[];
    disconnect?: Prisma.EquipmentWhereUniqueInput | Prisma.EquipmentWhereUniqueInput[];
    delete?: Prisma.EquipmentWhereUniqueInput | Prisma.EquipmentWhereUniqueInput[];
    connect?: Prisma.EquipmentWhereUniqueInput | Prisma.EquipmentWhereUniqueInput[];
    update?: Prisma.EquipmentUpdateWithWhereUniqueWithoutLocationInput | Prisma.EquipmentUpdateWithWhereUniqueWithoutLocationInput[];
    updateMany?: Prisma.EquipmentUpdateManyWithWhereWithoutLocationInput | Prisma.EquipmentUpdateManyWithWhereWithoutLocationInput[];
    deleteMany?: Prisma.EquipmentScalarWhereInput | Prisma.EquipmentScalarWhereInput[];
};
export type EquipmentCreateNestedManyWithoutCategoryInput = {
    create?: Prisma.XOR<Prisma.EquipmentCreateWithoutCategoryInput, Prisma.EquipmentUncheckedCreateWithoutCategoryInput> | Prisma.EquipmentCreateWithoutCategoryInput[] | Prisma.EquipmentUncheckedCreateWithoutCategoryInput[];
    connectOrCreate?: Prisma.EquipmentCreateOrConnectWithoutCategoryInput | Prisma.EquipmentCreateOrConnectWithoutCategoryInput[];
    createMany?: Prisma.EquipmentCreateManyCategoryInputEnvelope;
    connect?: Prisma.EquipmentWhereUniqueInput | Prisma.EquipmentWhereUniqueInput[];
};
export type EquipmentUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: Prisma.XOR<Prisma.EquipmentCreateWithoutCategoryInput, Prisma.EquipmentUncheckedCreateWithoutCategoryInput> | Prisma.EquipmentCreateWithoutCategoryInput[] | Prisma.EquipmentUncheckedCreateWithoutCategoryInput[];
    connectOrCreate?: Prisma.EquipmentCreateOrConnectWithoutCategoryInput | Prisma.EquipmentCreateOrConnectWithoutCategoryInput[];
    createMany?: Prisma.EquipmentCreateManyCategoryInputEnvelope;
    connect?: Prisma.EquipmentWhereUniqueInput | Prisma.EquipmentWhereUniqueInput[];
};
export type EquipmentUpdateManyWithoutCategoryNestedInput = {
    create?: Prisma.XOR<Prisma.EquipmentCreateWithoutCategoryInput, Prisma.EquipmentUncheckedCreateWithoutCategoryInput> | Prisma.EquipmentCreateWithoutCategoryInput[] | Prisma.EquipmentUncheckedCreateWithoutCategoryInput[];
    connectOrCreate?: Prisma.EquipmentCreateOrConnectWithoutCategoryInput | Prisma.EquipmentCreateOrConnectWithoutCategoryInput[];
    upsert?: Prisma.EquipmentUpsertWithWhereUniqueWithoutCategoryInput | Prisma.EquipmentUpsertWithWhereUniqueWithoutCategoryInput[];
    createMany?: Prisma.EquipmentCreateManyCategoryInputEnvelope;
    set?: Prisma.EquipmentWhereUniqueInput | Prisma.EquipmentWhereUniqueInput[];
    disconnect?: Prisma.EquipmentWhereUniqueInput | Prisma.EquipmentWhereUniqueInput[];
    delete?: Prisma.EquipmentWhereUniqueInput | Prisma.EquipmentWhereUniqueInput[];
    connect?: Prisma.EquipmentWhereUniqueInput | Prisma.EquipmentWhereUniqueInput[];
    update?: Prisma.EquipmentUpdateWithWhereUniqueWithoutCategoryInput | Prisma.EquipmentUpdateWithWhereUniqueWithoutCategoryInput[];
    updateMany?: Prisma.EquipmentUpdateManyWithWhereWithoutCategoryInput | Prisma.EquipmentUpdateManyWithWhereWithoutCategoryInput[];
    deleteMany?: Prisma.EquipmentScalarWhereInput | Prisma.EquipmentScalarWhereInput[];
};
export type EquipmentUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: Prisma.XOR<Prisma.EquipmentCreateWithoutCategoryInput, Prisma.EquipmentUncheckedCreateWithoutCategoryInput> | Prisma.EquipmentCreateWithoutCategoryInput[] | Prisma.EquipmentUncheckedCreateWithoutCategoryInput[];
    connectOrCreate?: Prisma.EquipmentCreateOrConnectWithoutCategoryInput | Prisma.EquipmentCreateOrConnectWithoutCategoryInput[];
    upsert?: Prisma.EquipmentUpsertWithWhereUniqueWithoutCategoryInput | Prisma.EquipmentUpsertWithWhereUniqueWithoutCategoryInput[];
    createMany?: Prisma.EquipmentCreateManyCategoryInputEnvelope;
    set?: Prisma.EquipmentWhereUniqueInput | Prisma.EquipmentWhereUniqueInput[];
    disconnect?: Prisma.EquipmentWhereUniqueInput | Prisma.EquipmentWhereUniqueInput[];
    delete?: Prisma.EquipmentWhereUniqueInput | Prisma.EquipmentWhereUniqueInput[];
    connect?: Prisma.EquipmentWhereUniqueInput | Prisma.EquipmentWhereUniqueInput[];
    update?: Prisma.EquipmentUpdateWithWhereUniqueWithoutCategoryInput | Prisma.EquipmentUpdateWithWhereUniqueWithoutCategoryInput[];
    updateMany?: Prisma.EquipmentUpdateManyWithWhereWithoutCategoryInput | Prisma.EquipmentUpdateManyWithWhereWithoutCategoryInput[];
    deleteMany?: Prisma.EquipmentScalarWhereInput | Prisma.EquipmentScalarWhereInput[];
};
export type EnumEquipmentStatusFieldUpdateOperationsInput = {
    set?: $Enums.EquipmentStatus;
};
export type EnumCriticalityFieldUpdateOperationsInput = {
    set?: $Enums.Criticality;
};
export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null;
};
export type EquipmentCreateNestedOneWithoutLocationHistoryInput = {
    create?: Prisma.XOR<Prisma.EquipmentCreateWithoutLocationHistoryInput, Prisma.EquipmentUncheckedCreateWithoutLocationHistoryInput>;
    connectOrCreate?: Prisma.EquipmentCreateOrConnectWithoutLocationHistoryInput;
    connect?: Prisma.EquipmentWhereUniqueInput;
};
export type EquipmentUpdateOneRequiredWithoutLocationHistoryNestedInput = {
    create?: Prisma.XOR<Prisma.EquipmentCreateWithoutLocationHistoryInput, Prisma.EquipmentUncheckedCreateWithoutLocationHistoryInput>;
    connectOrCreate?: Prisma.EquipmentCreateOrConnectWithoutLocationHistoryInput;
    upsert?: Prisma.EquipmentUpsertWithoutLocationHistoryInput;
    connect?: Prisma.EquipmentWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.EquipmentUpdateToOneWithWhereWithoutLocationHistoryInput, Prisma.EquipmentUpdateWithoutLocationHistoryInput>, Prisma.EquipmentUncheckedUpdateWithoutLocationHistoryInput>;
};
export type EquipmentCreateWithoutDepartmentInput = {
    code: string;
    serialNumber?: string | null;
    name: string;
    description?: string | null;
    status?: $Enums.EquipmentStatus;
    criticality: $Enums.Criticality;
    isDeactivated?: boolean;
    deactivatedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    location: Prisma.LocationCreateNestedOneWithoutEquipmentInput;
    category: Prisma.EquipmentCategoryCreateNestedOneWithoutEquipmentInput;
    locationHistory?: Prisma.EquipmentLocationHistoryCreateNestedManyWithoutEquipmentInput;
};
export type EquipmentUncheckedCreateWithoutDepartmentInput = {
    id?: number;
    code: string;
    serialNumber?: string | null;
    name: string;
    description?: string | null;
    status?: $Enums.EquipmentStatus;
    criticality: $Enums.Criticality;
    locationId: number;
    categoryId: number;
    isDeactivated?: boolean;
    deactivatedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    locationHistory?: Prisma.EquipmentLocationHistoryUncheckedCreateNestedManyWithoutEquipmentInput;
};
export type EquipmentCreateOrConnectWithoutDepartmentInput = {
    where: Prisma.EquipmentWhereUniqueInput;
    create: Prisma.XOR<Prisma.EquipmentCreateWithoutDepartmentInput, Prisma.EquipmentUncheckedCreateWithoutDepartmentInput>;
};
export type EquipmentCreateManyDepartmentInputEnvelope = {
    data: Prisma.EquipmentCreateManyDepartmentInput | Prisma.EquipmentCreateManyDepartmentInput[];
    skipDuplicates?: boolean;
};
export type EquipmentUpsertWithWhereUniqueWithoutDepartmentInput = {
    where: Prisma.EquipmentWhereUniqueInput;
    update: Prisma.XOR<Prisma.EquipmentUpdateWithoutDepartmentInput, Prisma.EquipmentUncheckedUpdateWithoutDepartmentInput>;
    create: Prisma.XOR<Prisma.EquipmentCreateWithoutDepartmentInput, Prisma.EquipmentUncheckedCreateWithoutDepartmentInput>;
};
export type EquipmentUpdateWithWhereUniqueWithoutDepartmentInput = {
    where: Prisma.EquipmentWhereUniqueInput;
    data: Prisma.XOR<Prisma.EquipmentUpdateWithoutDepartmentInput, Prisma.EquipmentUncheckedUpdateWithoutDepartmentInput>;
};
export type EquipmentUpdateManyWithWhereWithoutDepartmentInput = {
    where: Prisma.EquipmentScalarWhereInput;
    data: Prisma.XOR<Prisma.EquipmentUpdateManyMutationInput, Prisma.EquipmentUncheckedUpdateManyWithoutDepartmentInput>;
};
export type EquipmentScalarWhereInput = {
    AND?: Prisma.EquipmentScalarWhereInput | Prisma.EquipmentScalarWhereInput[];
    OR?: Prisma.EquipmentScalarWhereInput[];
    NOT?: Prisma.EquipmentScalarWhereInput | Prisma.EquipmentScalarWhereInput[];
    id?: Prisma.IntFilter<"Equipment"> | number;
    code?: Prisma.StringFilter<"Equipment"> | string;
    serialNumber?: Prisma.StringNullableFilter<"Equipment"> | string | null;
    name?: Prisma.StringFilter<"Equipment"> | string;
    description?: Prisma.StringNullableFilter<"Equipment"> | string | null;
    status?: Prisma.EnumEquipmentStatusFilter<"Equipment"> | $Enums.EquipmentStatus;
    criticality?: Prisma.EnumCriticalityFilter<"Equipment"> | $Enums.Criticality;
    departmentId?: Prisma.IntFilter<"Equipment"> | number;
    locationId?: Prisma.IntFilter<"Equipment"> | number;
    categoryId?: Prisma.IntFilter<"Equipment"> | number;
    isDeactivated?: Prisma.BoolFilter<"Equipment"> | boolean;
    deactivatedAt?: Prisma.DateTimeNullableFilter<"Equipment"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"Equipment"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Equipment"> | Date | string;
};
export type EquipmentCreateWithoutLocationInput = {
    code: string;
    serialNumber?: string | null;
    name: string;
    description?: string | null;
    status?: $Enums.EquipmentStatus;
    criticality: $Enums.Criticality;
    isDeactivated?: boolean;
    deactivatedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    department: Prisma.DepartmentCreateNestedOneWithoutEquipmentInput;
    category: Prisma.EquipmentCategoryCreateNestedOneWithoutEquipmentInput;
    locationHistory?: Prisma.EquipmentLocationHistoryCreateNestedManyWithoutEquipmentInput;
};
export type EquipmentUncheckedCreateWithoutLocationInput = {
    id?: number;
    code: string;
    serialNumber?: string | null;
    name: string;
    description?: string | null;
    status?: $Enums.EquipmentStatus;
    criticality: $Enums.Criticality;
    departmentId: number;
    categoryId: number;
    isDeactivated?: boolean;
    deactivatedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    locationHistory?: Prisma.EquipmentLocationHistoryUncheckedCreateNestedManyWithoutEquipmentInput;
};
export type EquipmentCreateOrConnectWithoutLocationInput = {
    where: Prisma.EquipmentWhereUniqueInput;
    create: Prisma.XOR<Prisma.EquipmentCreateWithoutLocationInput, Prisma.EquipmentUncheckedCreateWithoutLocationInput>;
};
export type EquipmentCreateManyLocationInputEnvelope = {
    data: Prisma.EquipmentCreateManyLocationInput | Prisma.EquipmentCreateManyLocationInput[];
    skipDuplicates?: boolean;
};
export type EquipmentUpsertWithWhereUniqueWithoutLocationInput = {
    where: Prisma.EquipmentWhereUniqueInput;
    update: Prisma.XOR<Prisma.EquipmentUpdateWithoutLocationInput, Prisma.EquipmentUncheckedUpdateWithoutLocationInput>;
    create: Prisma.XOR<Prisma.EquipmentCreateWithoutLocationInput, Prisma.EquipmentUncheckedCreateWithoutLocationInput>;
};
export type EquipmentUpdateWithWhereUniqueWithoutLocationInput = {
    where: Prisma.EquipmentWhereUniqueInput;
    data: Prisma.XOR<Prisma.EquipmentUpdateWithoutLocationInput, Prisma.EquipmentUncheckedUpdateWithoutLocationInput>;
};
export type EquipmentUpdateManyWithWhereWithoutLocationInput = {
    where: Prisma.EquipmentScalarWhereInput;
    data: Prisma.XOR<Prisma.EquipmentUpdateManyMutationInput, Prisma.EquipmentUncheckedUpdateManyWithoutLocationInput>;
};
export type EquipmentCreateWithoutCategoryInput = {
    code: string;
    serialNumber?: string | null;
    name: string;
    description?: string | null;
    status?: $Enums.EquipmentStatus;
    criticality: $Enums.Criticality;
    isDeactivated?: boolean;
    deactivatedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    department: Prisma.DepartmentCreateNestedOneWithoutEquipmentInput;
    location: Prisma.LocationCreateNestedOneWithoutEquipmentInput;
    locationHistory?: Prisma.EquipmentLocationHistoryCreateNestedManyWithoutEquipmentInput;
};
export type EquipmentUncheckedCreateWithoutCategoryInput = {
    id?: number;
    code: string;
    serialNumber?: string | null;
    name: string;
    description?: string | null;
    status?: $Enums.EquipmentStatus;
    criticality: $Enums.Criticality;
    departmentId: number;
    locationId: number;
    isDeactivated?: boolean;
    deactivatedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    locationHistory?: Prisma.EquipmentLocationHistoryUncheckedCreateNestedManyWithoutEquipmentInput;
};
export type EquipmentCreateOrConnectWithoutCategoryInput = {
    where: Prisma.EquipmentWhereUniqueInput;
    create: Prisma.XOR<Prisma.EquipmentCreateWithoutCategoryInput, Prisma.EquipmentUncheckedCreateWithoutCategoryInput>;
};
export type EquipmentCreateManyCategoryInputEnvelope = {
    data: Prisma.EquipmentCreateManyCategoryInput | Prisma.EquipmentCreateManyCategoryInput[];
    skipDuplicates?: boolean;
};
export type EquipmentUpsertWithWhereUniqueWithoutCategoryInput = {
    where: Prisma.EquipmentWhereUniqueInput;
    update: Prisma.XOR<Prisma.EquipmentUpdateWithoutCategoryInput, Prisma.EquipmentUncheckedUpdateWithoutCategoryInput>;
    create: Prisma.XOR<Prisma.EquipmentCreateWithoutCategoryInput, Prisma.EquipmentUncheckedCreateWithoutCategoryInput>;
};
export type EquipmentUpdateWithWhereUniqueWithoutCategoryInput = {
    where: Prisma.EquipmentWhereUniqueInput;
    data: Prisma.XOR<Prisma.EquipmentUpdateWithoutCategoryInput, Prisma.EquipmentUncheckedUpdateWithoutCategoryInput>;
};
export type EquipmentUpdateManyWithWhereWithoutCategoryInput = {
    where: Prisma.EquipmentScalarWhereInput;
    data: Prisma.XOR<Prisma.EquipmentUpdateManyMutationInput, Prisma.EquipmentUncheckedUpdateManyWithoutCategoryInput>;
};
export type EquipmentCreateWithoutLocationHistoryInput = {
    code: string;
    serialNumber?: string | null;
    name: string;
    description?: string | null;
    status?: $Enums.EquipmentStatus;
    criticality: $Enums.Criticality;
    isDeactivated?: boolean;
    deactivatedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    department: Prisma.DepartmentCreateNestedOneWithoutEquipmentInput;
    location: Prisma.LocationCreateNestedOneWithoutEquipmentInput;
    category: Prisma.EquipmentCategoryCreateNestedOneWithoutEquipmentInput;
};
export type EquipmentUncheckedCreateWithoutLocationHistoryInput = {
    id?: number;
    code: string;
    serialNumber?: string | null;
    name: string;
    description?: string | null;
    status?: $Enums.EquipmentStatus;
    criticality: $Enums.Criticality;
    departmentId: number;
    locationId: number;
    categoryId: number;
    isDeactivated?: boolean;
    deactivatedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type EquipmentCreateOrConnectWithoutLocationHistoryInput = {
    where: Prisma.EquipmentWhereUniqueInput;
    create: Prisma.XOR<Prisma.EquipmentCreateWithoutLocationHistoryInput, Prisma.EquipmentUncheckedCreateWithoutLocationHistoryInput>;
};
export type EquipmentUpsertWithoutLocationHistoryInput = {
    update: Prisma.XOR<Prisma.EquipmentUpdateWithoutLocationHistoryInput, Prisma.EquipmentUncheckedUpdateWithoutLocationHistoryInput>;
    create: Prisma.XOR<Prisma.EquipmentCreateWithoutLocationHistoryInput, Prisma.EquipmentUncheckedCreateWithoutLocationHistoryInput>;
    where?: Prisma.EquipmentWhereInput;
};
export type EquipmentUpdateToOneWithWhereWithoutLocationHistoryInput = {
    where?: Prisma.EquipmentWhereInput;
    data: Prisma.XOR<Prisma.EquipmentUpdateWithoutLocationHistoryInput, Prisma.EquipmentUncheckedUpdateWithoutLocationHistoryInput>;
};
export type EquipmentUpdateWithoutLocationHistoryInput = {
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    serialNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumEquipmentStatusFieldUpdateOperationsInput | $Enums.EquipmentStatus;
    criticality?: Prisma.EnumCriticalityFieldUpdateOperationsInput | $Enums.Criticality;
    isDeactivated?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    deactivatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    department?: Prisma.DepartmentUpdateOneRequiredWithoutEquipmentNestedInput;
    location?: Prisma.LocationUpdateOneRequiredWithoutEquipmentNestedInput;
    category?: Prisma.EquipmentCategoryUpdateOneRequiredWithoutEquipmentNestedInput;
};
export type EquipmentUncheckedUpdateWithoutLocationHistoryInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    serialNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumEquipmentStatusFieldUpdateOperationsInput | $Enums.EquipmentStatus;
    criticality?: Prisma.EnumCriticalityFieldUpdateOperationsInput | $Enums.Criticality;
    departmentId?: Prisma.IntFieldUpdateOperationsInput | number;
    locationId?: Prisma.IntFieldUpdateOperationsInput | number;
    categoryId?: Prisma.IntFieldUpdateOperationsInput | number;
    isDeactivated?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    deactivatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type EquipmentCreateManyDepartmentInput = {
    id?: number;
    code: string;
    serialNumber?: string | null;
    name: string;
    description?: string | null;
    status?: $Enums.EquipmentStatus;
    criticality: $Enums.Criticality;
    locationId: number;
    categoryId: number;
    isDeactivated?: boolean;
    deactivatedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type EquipmentUpdateWithoutDepartmentInput = {
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    serialNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumEquipmentStatusFieldUpdateOperationsInput | $Enums.EquipmentStatus;
    criticality?: Prisma.EnumCriticalityFieldUpdateOperationsInput | $Enums.Criticality;
    isDeactivated?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    deactivatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    location?: Prisma.LocationUpdateOneRequiredWithoutEquipmentNestedInput;
    category?: Prisma.EquipmentCategoryUpdateOneRequiredWithoutEquipmentNestedInput;
    locationHistory?: Prisma.EquipmentLocationHistoryUpdateManyWithoutEquipmentNestedInput;
};
export type EquipmentUncheckedUpdateWithoutDepartmentInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    serialNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumEquipmentStatusFieldUpdateOperationsInput | $Enums.EquipmentStatus;
    criticality?: Prisma.EnumCriticalityFieldUpdateOperationsInput | $Enums.Criticality;
    locationId?: Prisma.IntFieldUpdateOperationsInput | number;
    categoryId?: Prisma.IntFieldUpdateOperationsInput | number;
    isDeactivated?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    deactivatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    locationHistory?: Prisma.EquipmentLocationHistoryUncheckedUpdateManyWithoutEquipmentNestedInput;
};
export type EquipmentUncheckedUpdateManyWithoutDepartmentInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    serialNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumEquipmentStatusFieldUpdateOperationsInput | $Enums.EquipmentStatus;
    criticality?: Prisma.EnumCriticalityFieldUpdateOperationsInput | $Enums.Criticality;
    locationId?: Prisma.IntFieldUpdateOperationsInput | number;
    categoryId?: Prisma.IntFieldUpdateOperationsInput | number;
    isDeactivated?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    deactivatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type EquipmentCreateManyLocationInput = {
    id?: number;
    code: string;
    serialNumber?: string | null;
    name: string;
    description?: string | null;
    status?: $Enums.EquipmentStatus;
    criticality: $Enums.Criticality;
    departmentId: number;
    categoryId: number;
    isDeactivated?: boolean;
    deactivatedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type EquipmentUpdateWithoutLocationInput = {
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    serialNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumEquipmentStatusFieldUpdateOperationsInput | $Enums.EquipmentStatus;
    criticality?: Prisma.EnumCriticalityFieldUpdateOperationsInput | $Enums.Criticality;
    isDeactivated?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    deactivatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    department?: Prisma.DepartmentUpdateOneRequiredWithoutEquipmentNestedInput;
    category?: Prisma.EquipmentCategoryUpdateOneRequiredWithoutEquipmentNestedInput;
    locationHistory?: Prisma.EquipmentLocationHistoryUpdateManyWithoutEquipmentNestedInput;
};
export type EquipmentUncheckedUpdateWithoutLocationInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    serialNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumEquipmentStatusFieldUpdateOperationsInput | $Enums.EquipmentStatus;
    criticality?: Prisma.EnumCriticalityFieldUpdateOperationsInput | $Enums.Criticality;
    departmentId?: Prisma.IntFieldUpdateOperationsInput | number;
    categoryId?: Prisma.IntFieldUpdateOperationsInput | number;
    isDeactivated?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    deactivatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    locationHistory?: Prisma.EquipmentLocationHistoryUncheckedUpdateManyWithoutEquipmentNestedInput;
};
export type EquipmentUncheckedUpdateManyWithoutLocationInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    serialNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumEquipmentStatusFieldUpdateOperationsInput | $Enums.EquipmentStatus;
    criticality?: Prisma.EnumCriticalityFieldUpdateOperationsInput | $Enums.Criticality;
    departmentId?: Prisma.IntFieldUpdateOperationsInput | number;
    categoryId?: Prisma.IntFieldUpdateOperationsInput | number;
    isDeactivated?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    deactivatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type EquipmentCreateManyCategoryInput = {
    id?: number;
    code: string;
    serialNumber?: string | null;
    name: string;
    description?: string | null;
    status?: $Enums.EquipmentStatus;
    criticality: $Enums.Criticality;
    departmentId: number;
    locationId: number;
    isDeactivated?: boolean;
    deactivatedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type EquipmentUpdateWithoutCategoryInput = {
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    serialNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumEquipmentStatusFieldUpdateOperationsInput | $Enums.EquipmentStatus;
    criticality?: Prisma.EnumCriticalityFieldUpdateOperationsInput | $Enums.Criticality;
    isDeactivated?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    deactivatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    department?: Prisma.DepartmentUpdateOneRequiredWithoutEquipmentNestedInput;
    location?: Prisma.LocationUpdateOneRequiredWithoutEquipmentNestedInput;
    locationHistory?: Prisma.EquipmentLocationHistoryUpdateManyWithoutEquipmentNestedInput;
};
export type EquipmentUncheckedUpdateWithoutCategoryInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    serialNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumEquipmentStatusFieldUpdateOperationsInput | $Enums.EquipmentStatus;
    criticality?: Prisma.EnumCriticalityFieldUpdateOperationsInput | $Enums.Criticality;
    departmentId?: Prisma.IntFieldUpdateOperationsInput | number;
    locationId?: Prisma.IntFieldUpdateOperationsInput | number;
    isDeactivated?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    deactivatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    locationHistory?: Prisma.EquipmentLocationHistoryUncheckedUpdateManyWithoutEquipmentNestedInput;
};
export type EquipmentUncheckedUpdateManyWithoutCategoryInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    serialNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumEquipmentStatusFieldUpdateOperationsInput | $Enums.EquipmentStatus;
    criticality?: Prisma.EnumCriticalityFieldUpdateOperationsInput | $Enums.Criticality;
    departmentId?: Prisma.IntFieldUpdateOperationsInput | number;
    locationId?: Prisma.IntFieldUpdateOperationsInput | number;
    isDeactivated?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    deactivatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
/**
 * Count Type EquipmentCountOutputType
 */
export type EquipmentCountOutputType = {
    locationHistory: number;
};
export type EquipmentCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    locationHistory?: boolean | EquipmentCountOutputTypeCountLocationHistoryArgs;
};
/**
 * EquipmentCountOutputType without action
 */
export type EquipmentCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EquipmentCountOutputType
     */
    select?: Prisma.EquipmentCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * EquipmentCountOutputType without action
 */
export type EquipmentCountOutputTypeCountLocationHistoryArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.EquipmentLocationHistoryWhereInput;
};
export type EquipmentSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    code?: boolean;
    serialNumber?: boolean;
    name?: boolean;
    description?: boolean;
    status?: boolean;
    criticality?: boolean;
    departmentId?: boolean;
    locationId?: boolean;
    categoryId?: boolean;
    isDeactivated?: boolean;
    deactivatedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    department?: boolean | Prisma.DepartmentDefaultArgs<ExtArgs>;
    location?: boolean | Prisma.LocationDefaultArgs<ExtArgs>;
    category?: boolean | Prisma.EquipmentCategoryDefaultArgs<ExtArgs>;
    locationHistory?: boolean | Prisma.Equipment$locationHistoryArgs<ExtArgs>;
    _count?: boolean | Prisma.EquipmentCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["equipment"]>;
export type EquipmentSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    code?: boolean;
    serialNumber?: boolean;
    name?: boolean;
    description?: boolean;
    status?: boolean;
    criticality?: boolean;
    departmentId?: boolean;
    locationId?: boolean;
    categoryId?: boolean;
    isDeactivated?: boolean;
    deactivatedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    department?: boolean | Prisma.DepartmentDefaultArgs<ExtArgs>;
    location?: boolean | Prisma.LocationDefaultArgs<ExtArgs>;
    category?: boolean | Prisma.EquipmentCategoryDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["equipment"]>;
export type EquipmentSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    code?: boolean;
    serialNumber?: boolean;
    name?: boolean;
    description?: boolean;
    status?: boolean;
    criticality?: boolean;
    departmentId?: boolean;
    locationId?: boolean;
    categoryId?: boolean;
    isDeactivated?: boolean;
    deactivatedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    department?: boolean | Prisma.DepartmentDefaultArgs<ExtArgs>;
    location?: boolean | Prisma.LocationDefaultArgs<ExtArgs>;
    category?: boolean | Prisma.EquipmentCategoryDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["equipment"]>;
export type EquipmentSelectScalar = {
    id?: boolean;
    code?: boolean;
    serialNumber?: boolean;
    name?: boolean;
    description?: boolean;
    status?: boolean;
    criticality?: boolean;
    departmentId?: boolean;
    locationId?: boolean;
    categoryId?: boolean;
    isDeactivated?: boolean;
    deactivatedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type EquipmentOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "code" | "serialNumber" | "name" | "description" | "status" | "criticality" | "departmentId" | "locationId" | "categoryId" | "isDeactivated" | "deactivatedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["equipment"]>;
export type EquipmentInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    department?: boolean | Prisma.DepartmentDefaultArgs<ExtArgs>;
    location?: boolean | Prisma.LocationDefaultArgs<ExtArgs>;
    category?: boolean | Prisma.EquipmentCategoryDefaultArgs<ExtArgs>;
    locationHistory?: boolean | Prisma.Equipment$locationHistoryArgs<ExtArgs>;
    _count?: boolean | Prisma.EquipmentCountOutputTypeDefaultArgs<ExtArgs>;
};
export type EquipmentIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    department?: boolean | Prisma.DepartmentDefaultArgs<ExtArgs>;
    location?: boolean | Prisma.LocationDefaultArgs<ExtArgs>;
    category?: boolean | Prisma.EquipmentCategoryDefaultArgs<ExtArgs>;
};
export type EquipmentIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    department?: boolean | Prisma.DepartmentDefaultArgs<ExtArgs>;
    location?: boolean | Prisma.LocationDefaultArgs<ExtArgs>;
    category?: boolean | Prisma.EquipmentCategoryDefaultArgs<ExtArgs>;
};
export type $EquipmentPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Equipment";
    objects: {
        department: Prisma.$DepartmentPayload<ExtArgs>;
        location: Prisma.$LocationPayload<ExtArgs>;
        category: Prisma.$EquipmentCategoryPayload<ExtArgs>;
        locationHistory: Prisma.$EquipmentLocationHistoryPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        code: string;
        serialNumber: string | null;
        name: string;
        description: string | null;
        status: $Enums.EquipmentStatus;
        criticality: $Enums.Criticality;
        departmentId: number;
        locationId: number;
        categoryId: number;
        isDeactivated: boolean;
        deactivatedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["equipment"]>;
    composites: {};
};
export type EquipmentGetPayload<S extends boolean | null | undefined | EquipmentDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$EquipmentPayload, S>;
export type EquipmentCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<EquipmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: EquipmentCountAggregateInputType | true;
};
export interface EquipmentDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Equipment'];
        meta: {
            name: 'Equipment';
        };
    };
    /**
     * Find zero or one Equipment that matches the filter.
     * @param {EquipmentFindUniqueArgs} args - Arguments to find a Equipment
     * @example
     * // Get one Equipment
     * const equipment = await prisma.equipment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EquipmentFindUniqueArgs>(args: Prisma.SelectSubset<T, EquipmentFindUniqueArgs<ExtArgs>>): Prisma.Prisma__EquipmentClient<runtime.Types.Result.GetResult<Prisma.$EquipmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one Equipment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EquipmentFindUniqueOrThrowArgs} args - Arguments to find a Equipment
     * @example
     * // Get one Equipment
     * const equipment = await prisma.equipment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EquipmentFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, EquipmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__EquipmentClient<runtime.Types.Result.GetResult<Prisma.$EquipmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Equipment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EquipmentFindFirstArgs} args - Arguments to find a Equipment
     * @example
     * // Get one Equipment
     * const equipment = await prisma.equipment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EquipmentFindFirstArgs>(args?: Prisma.SelectSubset<T, EquipmentFindFirstArgs<ExtArgs>>): Prisma.Prisma__EquipmentClient<runtime.Types.Result.GetResult<Prisma.$EquipmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Equipment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EquipmentFindFirstOrThrowArgs} args - Arguments to find a Equipment
     * @example
     * // Get one Equipment
     * const equipment = await prisma.equipment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EquipmentFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, EquipmentFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__EquipmentClient<runtime.Types.Result.GetResult<Prisma.$EquipmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Equipment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EquipmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Equipment
     * const equipment = await prisma.equipment.findMany()
     *
     * // Get first 10 Equipment
     * const equipment = await prisma.equipment.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const equipmentWithIdOnly = await prisma.equipment.findMany({ select: { id: true } })
     *
     */
    findMany<T extends EquipmentFindManyArgs>(args?: Prisma.SelectSubset<T, EquipmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$EquipmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a Equipment.
     * @param {EquipmentCreateArgs} args - Arguments to create a Equipment.
     * @example
     * // Create one Equipment
     * const Equipment = await prisma.equipment.create({
     *   data: {
     *     // ... data to create a Equipment
     *   }
     * })
     *
     */
    create<T extends EquipmentCreateArgs>(args: Prisma.SelectSubset<T, EquipmentCreateArgs<ExtArgs>>): Prisma.Prisma__EquipmentClient<runtime.Types.Result.GetResult<Prisma.$EquipmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Equipment.
     * @param {EquipmentCreateManyArgs} args - Arguments to create many Equipment.
     * @example
     * // Create many Equipment
     * const equipment = await prisma.equipment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends EquipmentCreateManyArgs>(args?: Prisma.SelectSubset<T, EquipmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many Equipment and returns the data saved in the database.
     * @param {EquipmentCreateManyAndReturnArgs} args - Arguments to create many Equipment.
     * @example
     * // Create many Equipment
     * const equipment = await prisma.equipment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Equipment and only return the `id`
     * const equipmentWithIdOnly = await prisma.equipment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends EquipmentCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, EquipmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$EquipmentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a Equipment.
     * @param {EquipmentDeleteArgs} args - Arguments to delete one Equipment.
     * @example
     * // Delete one Equipment
     * const Equipment = await prisma.equipment.delete({
     *   where: {
     *     // ... filter to delete one Equipment
     *   }
     * })
     *
     */
    delete<T extends EquipmentDeleteArgs>(args: Prisma.SelectSubset<T, EquipmentDeleteArgs<ExtArgs>>): Prisma.Prisma__EquipmentClient<runtime.Types.Result.GetResult<Prisma.$EquipmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one Equipment.
     * @param {EquipmentUpdateArgs} args - Arguments to update one Equipment.
     * @example
     * // Update one Equipment
     * const equipment = await prisma.equipment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends EquipmentUpdateArgs>(args: Prisma.SelectSubset<T, EquipmentUpdateArgs<ExtArgs>>): Prisma.Prisma__EquipmentClient<runtime.Types.Result.GetResult<Prisma.$EquipmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Equipment.
     * @param {EquipmentDeleteManyArgs} args - Arguments to filter Equipment to delete.
     * @example
     * // Delete a few Equipment
     * const { count } = await prisma.equipment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends EquipmentDeleteManyArgs>(args?: Prisma.SelectSubset<T, EquipmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Equipment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EquipmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Equipment
     * const equipment = await prisma.equipment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends EquipmentUpdateManyArgs>(args: Prisma.SelectSubset<T, EquipmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Equipment and returns the data updated in the database.
     * @param {EquipmentUpdateManyAndReturnArgs} args - Arguments to update many Equipment.
     * @example
     * // Update many Equipment
     * const equipment = await prisma.equipment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Equipment and only return the `id`
     * const equipmentWithIdOnly = await prisma.equipment.updateManyAndReturn({
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
    updateManyAndReturn<T extends EquipmentUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, EquipmentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$EquipmentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one Equipment.
     * @param {EquipmentUpsertArgs} args - Arguments to update or create a Equipment.
     * @example
     * // Update or create a Equipment
     * const equipment = await prisma.equipment.upsert({
     *   create: {
     *     // ... data to create a Equipment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Equipment we want to update
     *   }
     * })
     */
    upsert<T extends EquipmentUpsertArgs>(args: Prisma.SelectSubset<T, EquipmentUpsertArgs<ExtArgs>>): Prisma.Prisma__EquipmentClient<runtime.Types.Result.GetResult<Prisma.$EquipmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Equipment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EquipmentCountArgs} args - Arguments to filter Equipment to count.
     * @example
     * // Count the number of Equipment
     * const count = await prisma.equipment.count({
     *   where: {
     *     // ... the filter for the Equipment we want to count
     *   }
     * })
    **/
    count<T extends EquipmentCountArgs>(args?: Prisma.Subset<T, EquipmentCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], EquipmentCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a Equipment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EquipmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends EquipmentAggregateArgs>(args: Prisma.Subset<T, EquipmentAggregateArgs>): Prisma.PrismaPromise<GetEquipmentAggregateType<T>>;
    /**
     * Group by Equipment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EquipmentGroupByArgs} args - Group by arguments.
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
    groupBy<T extends EquipmentGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: EquipmentGroupByArgs['orderBy'];
    } : {
        orderBy?: EquipmentGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, EquipmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEquipmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Equipment model
     */
    readonly fields: EquipmentFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for Equipment.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__EquipmentClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    department<T extends Prisma.DepartmentDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.DepartmentDefaultArgs<ExtArgs>>): Prisma.Prisma__DepartmentClient<runtime.Types.Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    location<T extends Prisma.LocationDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.LocationDefaultArgs<ExtArgs>>): Prisma.Prisma__LocationClient<runtime.Types.Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    category<T extends Prisma.EquipmentCategoryDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.EquipmentCategoryDefaultArgs<ExtArgs>>): Prisma.Prisma__EquipmentCategoryClient<runtime.Types.Result.GetResult<Prisma.$EquipmentCategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    locationHistory<T extends Prisma.Equipment$locationHistoryArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Equipment$locationHistoryArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$EquipmentLocationHistoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
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
 * Fields of the Equipment model
 */
export interface EquipmentFieldRefs {
    readonly id: Prisma.FieldRef<"Equipment", 'Int'>;
    readonly code: Prisma.FieldRef<"Equipment", 'String'>;
    readonly serialNumber: Prisma.FieldRef<"Equipment", 'String'>;
    readonly name: Prisma.FieldRef<"Equipment", 'String'>;
    readonly description: Prisma.FieldRef<"Equipment", 'String'>;
    readonly status: Prisma.FieldRef<"Equipment", 'EquipmentStatus'>;
    readonly criticality: Prisma.FieldRef<"Equipment", 'Criticality'>;
    readonly departmentId: Prisma.FieldRef<"Equipment", 'Int'>;
    readonly locationId: Prisma.FieldRef<"Equipment", 'Int'>;
    readonly categoryId: Prisma.FieldRef<"Equipment", 'Int'>;
    readonly isDeactivated: Prisma.FieldRef<"Equipment", 'Boolean'>;
    readonly deactivatedAt: Prisma.FieldRef<"Equipment", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"Equipment", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Equipment", 'DateTime'>;
}
/**
 * Equipment findUnique
 */
export type EquipmentFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Equipment
     */
    select?: Prisma.EquipmentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Equipment
     */
    omit?: Prisma.EquipmentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.EquipmentInclude<ExtArgs> | null;
    /**
     * Filter, which Equipment to fetch.
     */
    where: Prisma.EquipmentWhereUniqueInput;
};
/**
 * Equipment findUniqueOrThrow
 */
export type EquipmentFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Equipment
     */
    select?: Prisma.EquipmentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Equipment
     */
    omit?: Prisma.EquipmentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.EquipmentInclude<ExtArgs> | null;
    /**
     * Filter, which Equipment to fetch.
     */
    where: Prisma.EquipmentWhereUniqueInput;
};
/**
 * Equipment findFirst
 */
export type EquipmentFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Equipment
     */
    select?: Prisma.EquipmentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Equipment
     */
    omit?: Prisma.EquipmentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.EquipmentInclude<ExtArgs> | null;
    /**
     * Filter, which Equipment to fetch.
     */
    where?: Prisma.EquipmentWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Equipment to fetch.
     */
    orderBy?: Prisma.EquipmentOrderByWithRelationInput | Prisma.EquipmentOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Equipment.
     */
    cursor?: Prisma.EquipmentWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Equipment from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Equipment.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Equipment.
     */
    distinct?: Prisma.EquipmentScalarFieldEnum | Prisma.EquipmentScalarFieldEnum[];
};
/**
 * Equipment findFirstOrThrow
 */
export type EquipmentFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Equipment
     */
    select?: Prisma.EquipmentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Equipment
     */
    omit?: Prisma.EquipmentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.EquipmentInclude<ExtArgs> | null;
    /**
     * Filter, which Equipment to fetch.
     */
    where?: Prisma.EquipmentWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Equipment to fetch.
     */
    orderBy?: Prisma.EquipmentOrderByWithRelationInput | Prisma.EquipmentOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Equipment.
     */
    cursor?: Prisma.EquipmentWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Equipment from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Equipment.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Equipment.
     */
    distinct?: Prisma.EquipmentScalarFieldEnum | Prisma.EquipmentScalarFieldEnum[];
};
/**
 * Equipment findMany
 */
export type EquipmentFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Equipment
     */
    select?: Prisma.EquipmentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Equipment
     */
    omit?: Prisma.EquipmentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.EquipmentInclude<ExtArgs> | null;
    /**
     * Filter, which Equipment to fetch.
     */
    where?: Prisma.EquipmentWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Equipment to fetch.
     */
    orderBy?: Prisma.EquipmentOrderByWithRelationInput | Prisma.EquipmentOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Equipment.
     */
    cursor?: Prisma.EquipmentWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Equipment from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Equipment.
     */
    skip?: number;
    distinct?: Prisma.EquipmentScalarFieldEnum | Prisma.EquipmentScalarFieldEnum[];
};
/**
 * Equipment create
 */
export type EquipmentCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Equipment
     */
    select?: Prisma.EquipmentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Equipment
     */
    omit?: Prisma.EquipmentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.EquipmentInclude<ExtArgs> | null;
    /**
     * The data needed to create a Equipment.
     */
    data: Prisma.XOR<Prisma.EquipmentCreateInput, Prisma.EquipmentUncheckedCreateInput>;
};
/**
 * Equipment createMany
 */
export type EquipmentCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many Equipment.
     */
    data: Prisma.EquipmentCreateManyInput | Prisma.EquipmentCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * Equipment createManyAndReturn
 */
export type EquipmentCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Equipment
     */
    select?: Prisma.EquipmentSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Equipment
     */
    omit?: Prisma.EquipmentOmit<ExtArgs> | null;
    /**
     * The data used to create many Equipment.
     */
    data: Prisma.EquipmentCreateManyInput | Prisma.EquipmentCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.EquipmentIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * Equipment update
 */
export type EquipmentUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Equipment
     */
    select?: Prisma.EquipmentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Equipment
     */
    omit?: Prisma.EquipmentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.EquipmentInclude<ExtArgs> | null;
    /**
     * The data needed to update a Equipment.
     */
    data: Prisma.XOR<Prisma.EquipmentUpdateInput, Prisma.EquipmentUncheckedUpdateInput>;
    /**
     * Choose, which Equipment to update.
     */
    where: Prisma.EquipmentWhereUniqueInput;
};
/**
 * Equipment updateMany
 */
export type EquipmentUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update Equipment.
     */
    data: Prisma.XOR<Prisma.EquipmentUpdateManyMutationInput, Prisma.EquipmentUncheckedUpdateManyInput>;
    /**
     * Filter which Equipment to update
     */
    where?: Prisma.EquipmentWhereInput;
    /**
     * Limit how many Equipment to update.
     */
    limit?: number;
};
/**
 * Equipment updateManyAndReturn
 */
export type EquipmentUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Equipment
     */
    select?: Prisma.EquipmentSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Equipment
     */
    omit?: Prisma.EquipmentOmit<ExtArgs> | null;
    /**
     * The data used to update Equipment.
     */
    data: Prisma.XOR<Prisma.EquipmentUpdateManyMutationInput, Prisma.EquipmentUncheckedUpdateManyInput>;
    /**
     * Filter which Equipment to update
     */
    where?: Prisma.EquipmentWhereInput;
    /**
     * Limit how many Equipment to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.EquipmentIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * Equipment upsert
 */
export type EquipmentUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Equipment
     */
    select?: Prisma.EquipmentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Equipment
     */
    omit?: Prisma.EquipmentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.EquipmentInclude<ExtArgs> | null;
    /**
     * The filter to search for the Equipment to update in case it exists.
     */
    where: Prisma.EquipmentWhereUniqueInput;
    /**
     * In case the Equipment found by the `where` argument doesn't exist, create a new Equipment with this data.
     */
    create: Prisma.XOR<Prisma.EquipmentCreateInput, Prisma.EquipmentUncheckedCreateInput>;
    /**
     * In case the Equipment was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.EquipmentUpdateInput, Prisma.EquipmentUncheckedUpdateInput>;
};
/**
 * Equipment delete
 */
export type EquipmentDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Equipment
     */
    select?: Prisma.EquipmentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Equipment
     */
    omit?: Prisma.EquipmentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.EquipmentInclude<ExtArgs> | null;
    /**
     * Filter which Equipment to delete.
     */
    where: Prisma.EquipmentWhereUniqueInput;
};
/**
 * Equipment deleteMany
 */
export type EquipmentDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Equipment to delete
     */
    where?: Prisma.EquipmentWhereInput;
    /**
     * Limit how many Equipment to delete.
     */
    limit?: number;
};
/**
 * Equipment.locationHistory
 */
export type Equipment$locationHistoryArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    where?: Prisma.EquipmentLocationHistoryWhereInput;
    orderBy?: Prisma.EquipmentLocationHistoryOrderByWithRelationInput | Prisma.EquipmentLocationHistoryOrderByWithRelationInput[];
    cursor?: Prisma.EquipmentLocationHistoryWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.EquipmentLocationHistoryScalarFieldEnum | Prisma.EquipmentLocationHistoryScalarFieldEnum[];
};
/**
 * Equipment without action
 */
export type EquipmentDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Equipment
     */
    select?: Prisma.EquipmentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Equipment
     */
    omit?: Prisma.EquipmentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.EquipmentInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=Equipment.d.ts.map