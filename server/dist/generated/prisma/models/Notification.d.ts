import type * as runtime from "@prisma/client/runtime/library";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model Notification
 *
 */
export type NotificationModel = runtime.Types.Result.DefaultSelection<Prisma.$NotificationPayload>;
export type AggregateNotification = {
    _count: NotificationCountAggregateOutputType | null;
    _avg: NotificationAvgAggregateOutputType | null;
    _sum: NotificationSumAggregateOutputType | null;
    _min: NotificationMinAggregateOutputType | null;
    _max: NotificationMaxAggregateOutputType | null;
};
export type NotificationAvgAggregateOutputType = {
    id: number | null;
    occurrenceId: number | null;
};
export type NotificationSumAggregateOutputType = {
    id: number | null;
    occurrenceId: number | null;
};
export type NotificationMinAggregateOutputType = {
    id: number | null;
    key: string | null;
    occurrenceId: number | null;
    kind: $Enums.NotificationKind | null;
    dueDate: Date | null;
    title: string | null;
    message: string | null;
    createdAt: Date | null;
};
export type NotificationMaxAggregateOutputType = {
    id: number | null;
    key: string | null;
    occurrenceId: number | null;
    kind: $Enums.NotificationKind | null;
    dueDate: Date | null;
    title: string | null;
    message: string | null;
    createdAt: Date | null;
};
export type NotificationCountAggregateOutputType = {
    id: number;
    key: number;
    occurrenceId: number;
    kind: number;
    dueDate: number;
    title: number;
    message: number;
    createdAt: number;
    _all: number;
};
export type NotificationAvgAggregateInputType = {
    id?: true;
    occurrenceId?: true;
};
export type NotificationSumAggregateInputType = {
    id?: true;
    occurrenceId?: true;
};
export type NotificationMinAggregateInputType = {
    id?: true;
    key?: true;
    occurrenceId?: true;
    kind?: true;
    dueDate?: true;
    title?: true;
    message?: true;
    createdAt?: true;
};
export type NotificationMaxAggregateInputType = {
    id?: true;
    key?: true;
    occurrenceId?: true;
    kind?: true;
    dueDate?: true;
    title?: true;
    message?: true;
    createdAt?: true;
};
export type NotificationCountAggregateInputType = {
    id?: true;
    key?: true;
    occurrenceId?: true;
    kind?: true;
    dueDate?: true;
    title?: true;
    message?: true;
    createdAt?: true;
    _all?: true;
};
export type NotificationAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Notification to aggregate.
     */
    where?: Prisma.NotificationWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Notifications to fetch.
     */
    orderBy?: Prisma.NotificationOrderByWithRelationInput | Prisma.NotificationOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.NotificationWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Notifications.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Notifications
    **/
    _count?: true | NotificationCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: NotificationAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: NotificationSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: NotificationMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: NotificationMaxAggregateInputType;
};
export type GetNotificationAggregateType<T extends NotificationAggregateArgs> = {
    [P in keyof T & keyof AggregateNotification]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateNotification[P]> : Prisma.GetScalarType<T[P], AggregateNotification[P]>;
};
export type NotificationGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.NotificationWhereInput;
    orderBy?: Prisma.NotificationOrderByWithAggregationInput | Prisma.NotificationOrderByWithAggregationInput[];
    by: Prisma.NotificationScalarFieldEnum[] | Prisma.NotificationScalarFieldEnum;
    having?: Prisma.NotificationScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: NotificationCountAggregateInputType | true;
    _avg?: NotificationAvgAggregateInputType;
    _sum?: NotificationSumAggregateInputType;
    _min?: NotificationMinAggregateInputType;
    _max?: NotificationMaxAggregateInputType;
};
export type NotificationGroupByOutputType = {
    id: number;
    key: string;
    occurrenceId: number | null;
    kind: $Enums.NotificationKind;
    dueDate: Date;
    title: string;
    message: string;
    createdAt: Date;
    _count: NotificationCountAggregateOutputType | null;
    _avg: NotificationAvgAggregateOutputType | null;
    _sum: NotificationSumAggregateOutputType | null;
    _min: NotificationMinAggregateOutputType | null;
    _max: NotificationMaxAggregateOutputType | null;
};
type GetNotificationGroupByPayload<T extends NotificationGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<NotificationGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof NotificationGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], NotificationGroupByOutputType[P]> : Prisma.GetScalarType<T[P], NotificationGroupByOutputType[P]>;
}>>;
export type NotificationWhereInput = {
    AND?: Prisma.NotificationWhereInput | Prisma.NotificationWhereInput[];
    OR?: Prisma.NotificationWhereInput[];
    NOT?: Prisma.NotificationWhereInput | Prisma.NotificationWhereInput[];
    id?: Prisma.IntFilter<"Notification"> | number;
    key?: Prisma.StringFilter<"Notification"> | string;
    occurrenceId?: Prisma.IntNullableFilter<"Notification"> | number | null;
    kind?: Prisma.EnumNotificationKindFilter<"Notification"> | $Enums.NotificationKind;
    dueDate?: Prisma.DateTimeFilter<"Notification"> | Date | string;
    title?: Prisma.StringFilter<"Notification"> | string;
    message?: Prisma.StringFilter<"Notification"> | string;
    createdAt?: Prisma.DateTimeFilter<"Notification"> | Date | string;
    occurrence?: Prisma.XOR<Prisma.MaintenanceOccurrenceNullableScalarRelationFilter, Prisma.MaintenanceOccurrenceWhereInput> | null;
    recipients?: Prisma.NotificationRecipientListRelationFilter;
};
export type NotificationOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    key?: Prisma.SortOrder;
    occurrenceId?: Prisma.SortOrderInput | Prisma.SortOrder;
    kind?: Prisma.SortOrder;
    dueDate?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    message?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    occurrence?: Prisma.MaintenanceOccurrenceOrderByWithRelationInput;
    recipients?: Prisma.NotificationRecipientOrderByRelationAggregateInput;
};
export type NotificationWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    key?: string;
    occurrenceId_kind_dueDate?: Prisma.NotificationOccurrenceIdKindDueDateCompoundUniqueInput;
    AND?: Prisma.NotificationWhereInput | Prisma.NotificationWhereInput[];
    OR?: Prisma.NotificationWhereInput[];
    NOT?: Prisma.NotificationWhereInput | Prisma.NotificationWhereInput[];
    occurrenceId?: Prisma.IntNullableFilter<"Notification"> | number | null;
    kind?: Prisma.EnumNotificationKindFilter<"Notification"> | $Enums.NotificationKind;
    dueDate?: Prisma.DateTimeFilter<"Notification"> | Date | string;
    title?: Prisma.StringFilter<"Notification"> | string;
    message?: Prisma.StringFilter<"Notification"> | string;
    createdAt?: Prisma.DateTimeFilter<"Notification"> | Date | string;
    occurrence?: Prisma.XOR<Prisma.MaintenanceOccurrenceNullableScalarRelationFilter, Prisma.MaintenanceOccurrenceWhereInput> | null;
    recipients?: Prisma.NotificationRecipientListRelationFilter;
}, "id" | "key" | "occurrenceId_kind_dueDate">;
export type NotificationOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    key?: Prisma.SortOrder;
    occurrenceId?: Prisma.SortOrderInput | Prisma.SortOrder;
    kind?: Prisma.SortOrder;
    dueDate?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    message?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.NotificationCountOrderByAggregateInput;
    _avg?: Prisma.NotificationAvgOrderByAggregateInput;
    _max?: Prisma.NotificationMaxOrderByAggregateInput;
    _min?: Prisma.NotificationMinOrderByAggregateInput;
    _sum?: Prisma.NotificationSumOrderByAggregateInput;
};
export type NotificationScalarWhereWithAggregatesInput = {
    AND?: Prisma.NotificationScalarWhereWithAggregatesInput | Prisma.NotificationScalarWhereWithAggregatesInput[];
    OR?: Prisma.NotificationScalarWhereWithAggregatesInput[];
    NOT?: Prisma.NotificationScalarWhereWithAggregatesInput | Prisma.NotificationScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"Notification"> | number;
    key?: Prisma.StringWithAggregatesFilter<"Notification"> | string;
    occurrenceId?: Prisma.IntNullableWithAggregatesFilter<"Notification"> | number | null;
    kind?: Prisma.EnumNotificationKindWithAggregatesFilter<"Notification"> | $Enums.NotificationKind;
    dueDate?: Prisma.DateTimeWithAggregatesFilter<"Notification"> | Date | string;
    title?: Prisma.StringWithAggregatesFilter<"Notification"> | string;
    message?: Prisma.StringWithAggregatesFilter<"Notification"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Notification"> | Date | string;
};
export type NotificationCreateInput = {
    key: string;
    kind: $Enums.NotificationKind;
    dueDate: Date | string;
    title: string;
    message: string;
    createdAt?: Date | string;
    occurrence?: Prisma.MaintenanceOccurrenceCreateNestedOneWithoutNotificationsInput;
    recipients?: Prisma.NotificationRecipientCreateNestedManyWithoutNotificationInput;
};
export type NotificationUncheckedCreateInput = {
    id?: number;
    key: string;
    occurrenceId?: number | null;
    kind: $Enums.NotificationKind;
    dueDate: Date | string;
    title: string;
    message: string;
    createdAt?: Date | string;
    recipients?: Prisma.NotificationRecipientUncheckedCreateNestedManyWithoutNotificationInput;
};
export type NotificationUpdateInput = {
    key?: Prisma.StringFieldUpdateOperationsInput | string;
    kind?: Prisma.EnumNotificationKindFieldUpdateOperationsInput | $Enums.NotificationKind;
    dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    occurrence?: Prisma.MaintenanceOccurrenceUpdateOneWithoutNotificationsNestedInput;
    recipients?: Prisma.NotificationRecipientUpdateManyWithoutNotificationNestedInput;
};
export type NotificationUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    key?: Prisma.StringFieldUpdateOperationsInput | string;
    occurrenceId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    kind?: Prisma.EnumNotificationKindFieldUpdateOperationsInput | $Enums.NotificationKind;
    dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    recipients?: Prisma.NotificationRecipientUncheckedUpdateManyWithoutNotificationNestedInput;
};
export type NotificationCreateManyInput = {
    id?: number;
    key: string;
    occurrenceId?: number | null;
    kind: $Enums.NotificationKind;
    dueDate: Date | string;
    title: string;
    message: string;
    createdAt?: Date | string;
};
export type NotificationUpdateManyMutationInput = {
    key?: Prisma.StringFieldUpdateOperationsInput | string;
    kind?: Prisma.EnumNotificationKindFieldUpdateOperationsInput | $Enums.NotificationKind;
    dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type NotificationUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    key?: Prisma.StringFieldUpdateOperationsInput | string;
    occurrenceId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    kind?: Prisma.EnumNotificationKindFieldUpdateOperationsInput | $Enums.NotificationKind;
    dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type NotificationListRelationFilter = {
    every?: Prisma.NotificationWhereInput;
    some?: Prisma.NotificationWhereInput;
    none?: Prisma.NotificationWhereInput;
};
export type NotificationOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type NotificationOccurrenceIdKindDueDateCompoundUniqueInput = {
    occurrenceId: number;
    kind: $Enums.NotificationKind;
    dueDate: Date | string;
};
export type NotificationCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    key?: Prisma.SortOrder;
    occurrenceId?: Prisma.SortOrder;
    kind?: Prisma.SortOrder;
    dueDate?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    message?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type NotificationAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    occurrenceId?: Prisma.SortOrder;
};
export type NotificationMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    key?: Prisma.SortOrder;
    occurrenceId?: Prisma.SortOrder;
    kind?: Prisma.SortOrder;
    dueDate?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    message?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type NotificationMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    key?: Prisma.SortOrder;
    occurrenceId?: Prisma.SortOrder;
    kind?: Prisma.SortOrder;
    dueDate?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    message?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type NotificationSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    occurrenceId?: Prisma.SortOrder;
};
export type NotificationScalarRelationFilter = {
    is?: Prisma.NotificationWhereInput;
    isNot?: Prisma.NotificationWhereInput;
};
export type NotificationCreateNestedManyWithoutOccurrenceInput = {
    create?: Prisma.XOR<Prisma.NotificationCreateWithoutOccurrenceInput, Prisma.NotificationUncheckedCreateWithoutOccurrenceInput> | Prisma.NotificationCreateWithoutOccurrenceInput[] | Prisma.NotificationUncheckedCreateWithoutOccurrenceInput[];
    connectOrCreate?: Prisma.NotificationCreateOrConnectWithoutOccurrenceInput | Prisma.NotificationCreateOrConnectWithoutOccurrenceInput[];
    createMany?: Prisma.NotificationCreateManyOccurrenceInputEnvelope;
    connect?: Prisma.NotificationWhereUniqueInput | Prisma.NotificationWhereUniqueInput[];
};
export type NotificationUncheckedCreateNestedManyWithoutOccurrenceInput = {
    create?: Prisma.XOR<Prisma.NotificationCreateWithoutOccurrenceInput, Prisma.NotificationUncheckedCreateWithoutOccurrenceInput> | Prisma.NotificationCreateWithoutOccurrenceInput[] | Prisma.NotificationUncheckedCreateWithoutOccurrenceInput[];
    connectOrCreate?: Prisma.NotificationCreateOrConnectWithoutOccurrenceInput | Prisma.NotificationCreateOrConnectWithoutOccurrenceInput[];
    createMany?: Prisma.NotificationCreateManyOccurrenceInputEnvelope;
    connect?: Prisma.NotificationWhereUniqueInput | Prisma.NotificationWhereUniqueInput[];
};
export type NotificationUpdateManyWithoutOccurrenceNestedInput = {
    create?: Prisma.XOR<Prisma.NotificationCreateWithoutOccurrenceInput, Prisma.NotificationUncheckedCreateWithoutOccurrenceInput> | Prisma.NotificationCreateWithoutOccurrenceInput[] | Prisma.NotificationUncheckedCreateWithoutOccurrenceInput[];
    connectOrCreate?: Prisma.NotificationCreateOrConnectWithoutOccurrenceInput | Prisma.NotificationCreateOrConnectWithoutOccurrenceInput[];
    upsert?: Prisma.NotificationUpsertWithWhereUniqueWithoutOccurrenceInput | Prisma.NotificationUpsertWithWhereUniqueWithoutOccurrenceInput[];
    createMany?: Prisma.NotificationCreateManyOccurrenceInputEnvelope;
    set?: Prisma.NotificationWhereUniqueInput | Prisma.NotificationWhereUniqueInput[];
    disconnect?: Prisma.NotificationWhereUniqueInput | Prisma.NotificationWhereUniqueInput[];
    delete?: Prisma.NotificationWhereUniqueInput | Prisma.NotificationWhereUniqueInput[];
    connect?: Prisma.NotificationWhereUniqueInput | Prisma.NotificationWhereUniqueInput[];
    update?: Prisma.NotificationUpdateWithWhereUniqueWithoutOccurrenceInput | Prisma.NotificationUpdateWithWhereUniqueWithoutOccurrenceInput[];
    updateMany?: Prisma.NotificationUpdateManyWithWhereWithoutOccurrenceInput | Prisma.NotificationUpdateManyWithWhereWithoutOccurrenceInput[];
    deleteMany?: Prisma.NotificationScalarWhereInput | Prisma.NotificationScalarWhereInput[];
};
export type NotificationUncheckedUpdateManyWithoutOccurrenceNestedInput = {
    create?: Prisma.XOR<Prisma.NotificationCreateWithoutOccurrenceInput, Prisma.NotificationUncheckedCreateWithoutOccurrenceInput> | Prisma.NotificationCreateWithoutOccurrenceInput[] | Prisma.NotificationUncheckedCreateWithoutOccurrenceInput[];
    connectOrCreate?: Prisma.NotificationCreateOrConnectWithoutOccurrenceInput | Prisma.NotificationCreateOrConnectWithoutOccurrenceInput[];
    upsert?: Prisma.NotificationUpsertWithWhereUniqueWithoutOccurrenceInput | Prisma.NotificationUpsertWithWhereUniqueWithoutOccurrenceInput[];
    createMany?: Prisma.NotificationCreateManyOccurrenceInputEnvelope;
    set?: Prisma.NotificationWhereUniqueInput | Prisma.NotificationWhereUniqueInput[];
    disconnect?: Prisma.NotificationWhereUniqueInput | Prisma.NotificationWhereUniqueInput[];
    delete?: Prisma.NotificationWhereUniqueInput | Prisma.NotificationWhereUniqueInput[];
    connect?: Prisma.NotificationWhereUniqueInput | Prisma.NotificationWhereUniqueInput[];
    update?: Prisma.NotificationUpdateWithWhereUniqueWithoutOccurrenceInput | Prisma.NotificationUpdateWithWhereUniqueWithoutOccurrenceInput[];
    updateMany?: Prisma.NotificationUpdateManyWithWhereWithoutOccurrenceInput | Prisma.NotificationUpdateManyWithWhereWithoutOccurrenceInput[];
    deleteMany?: Prisma.NotificationScalarWhereInput | Prisma.NotificationScalarWhereInput[];
};
export type EnumNotificationKindFieldUpdateOperationsInput = {
    set?: $Enums.NotificationKind;
};
export type NotificationCreateNestedOneWithoutRecipientsInput = {
    create?: Prisma.XOR<Prisma.NotificationCreateWithoutRecipientsInput, Prisma.NotificationUncheckedCreateWithoutRecipientsInput>;
    connectOrCreate?: Prisma.NotificationCreateOrConnectWithoutRecipientsInput;
    connect?: Prisma.NotificationWhereUniqueInput;
};
export type NotificationUpdateOneRequiredWithoutRecipientsNestedInput = {
    create?: Prisma.XOR<Prisma.NotificationCreateWithoutRecipientsInput, Prisma.NotificationUncheckedCreateWithoutRecipientsInput>;
    connectOrCreate?: Prisma.NotificationCreateOrConnectWithoutRecipientsInput;
    upsert?: Prisma.NotificationUpsertWithoutRecipientsInput;
    connect?: Prisma.NotificationWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.NotificationUpdateToOneWithWhereWithoutRecipientsInput, Prisma.NotificationUpdateWithoutRecipientsInput>, Prisma.NotificationUncheckedUpdateWithoutRecipientsInput>;
};
export type NotificationCreateWithoutOccurrenceInput = {
    key: string;
    kind: $Enums.NotificationKind;
    dueDate: Date | string;
    title: string;
    message: string;
    createdAt?: Date | string;
    recipients?: Prisma.NotificationRecipientCreateNestedManyWithoutNotificationInput;
};
export type NotificationUncheckedCreateWithoutOccurrenceInput = {
    id?: number;
    key: string;
    kind: $Enums.NotificationKind;
    dueDate: Date | string;
    title: string;
    message: string;
    createdAt?: Date | string;
    recipients?: Prisma.NotificationRecipientUncheckedCreateNestedManyWithoutNotificationInput;
};
export type NotificationCreateOrConnectWithoutOccurrenceInput = {
    where: Prisma.NotificationWhereUniqueInput;
    create: Prisma.XOR<Prisma.NotificationCreateWithoutOccurrenceInput, Prisma.NotificationUncheckedCreateWithoutOccurrenceInput>;
};
export type NotificationCreateManyOccurrenceInputEnvelope = {
    data: Prisma.NotificationCreateManyOccurrenceInput | Prisma.NotificationCreateManyOccurrenceInput[];
    skipDuplicates?: boolean;
};
export type NotificationUpsertWithWhereUniqueWithoutOccurrenceInput = {
    where: Prisma.NotificationWhereUniqueInput;
    update: Prisma.XOR<Prisma.NotificationUpdateWithoutOccurrenceInput, Prisma.NotificationUncheckedUpdateWithoutOccurrenceInput>;
    create: Prisma.XOR<Prisma.NotificationCreateWithoutOccurrenceInput, Prisma.NotificationUncheckedCreateWithoutOccurrenceInput>;
};
export type NotificationUpdateWithWhereUniqueWithoutOccurrenceInput = {
    where: Prisma.NotificationWhereUniqueInput;
    data: Prisma.XOR<Prisma.NotificationUpdateWithoutOccurrenceInput, Prisma.NotificationUncheckedUpdateWithoutOccurrenceInput>;
};
export type NotificationUpdateManyWithWhereWithoutOccurrenceInput = {
    where: Prisma.NotificationScalarWhereInput;
    data: Prisma.XOR<Prisma.NotificationUpdateManyMutationInput, Prisma.NotificationUncheckedUpdateManyWithoutOccurrenceInput>;
};
export type NotificationScalarWhereInput = {
    AND?: Prisma.NotificationScalarWhereInput | Prisma.NotificationScalarWhereInput[];
    OR?: Prisma.NotificationScalarWhereInput[];
    NOT?: Prisma.NotificationScalarWhereInput | Prisma.NotificationScalarWhereInput[];
    id?: Prisma.IntFilter<"Notification"> | number;
    key?: Prisma.StringFilter<"Notification"> | string;
    occurrenceId?: Prisma.IntNullableFilter<"Notification"> | number | null;
    kind?: Prisma.EnumNotificationKindFilter<"Notification"> | $Enums.NotificationKind;
    dueDate?: Prisma.DateTimeFilter<"Notification"> | Date | string;
    title?: Prisma.StringFilter<"Notification"> | string;
    message?: Prisma.StringFilter<"Notification"> | string;
    createdAt?: Prisma.DateTimeFilter<"Notification"> | Date | string;
};
export type NotificationCreateWithoutRecipientsInput = {
    key: string;
    kind: $Enums.NotificationKind;
    dueDate: Date | string;
    title: string;
    message: string;
    createdAt?: Date | string;
    occurrence?: Prisma.MaintenanceOccurrenceCreateNestedOneWithoutNotificationsInput;
};
export type NotificationUncheckedCreateWithoutRecipientsInput = {
    id?: number;
    key: string;
    occurrenceId?: number | null;
    kind: $Enums.NotificationKind;
    dueDate: Date | string;
    title: string;
    message: string;
    createdAt?: Date | string;
};
export type NotificationCreateOrConnectWithoutRecipientsInput = {
    where: Prisma.NotificationWhereUniqueInput;
    create: Prisma.XOR<Prisma.NotificationCreateWithoutRecipientsInput, Prisma.NotificationUncheckedCreateWithoutRecipientsInput>;
};
export type NotificationUpsertWithoutRecipientsInput = {
    update: Prisma.XOR<Prisma.NotificationUpdateWithoutRecipientsInput, Prisma.NotificationUncheckedUpdateWithoutRecipientsInput>;
    create: Prisma.XOR<Prisma.NotificationCreateWithoutRecipientsInput, Prisma.NotificationUncheckedCreateWithoutRecipientsInput>;
    where?: Prisma.NotificationWhereInput;
};
export type NotificationUpdateToOneWithWhereWithoutRecipientsInput = {
    where?: Prisma.NotificationWhereInput;
    data: Prisma.XOR<Prisma.NotificationUpdateWithoutRecipientsInput, Prisma.NotificationUncheckedUpdateWithoutRecipientsInput>;
};
export type NotificationUpdateWithoutRecipientsInput = {
    key?: Prisma.StringFieldUpdateOperationsInput | string;
    kind?: Prisma.EnumNotificationKindFieldUpdateOperationsInput | $Enums.NotificationKind;
    dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    occurrence?: Prisma.MaintenanceOccurrenceUpdateOneWithoutNotificationsNestedInput;
};
export type NotificationUncheckedUpdateWithoutRecipientsInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    key?: Prisma.StringFieldUpdateOperationsInput | string;
    occurrenceId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    kind?: Prisma.EnumNotificationKindFieldUpdateOperationsInput | $Enums.NotificationKind;
    dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type NotificationCreateManyOccurrenceInput = {
    id?: number;
    key: string;
    kind: $Enums.NotificationKind;
    dueDate: Date | string;
    title: string;
    message: string;
    createdAt?: Date | string;
};
export type NotificationUpdateWithoutOccurrenceInput = {
    key?: Prisma.StringFieldUpdateOperationsInput | string;
    kind?: Prisma.EnumNotificationKindFieldUpdateOperationsInput | $Enums.NotificationKind;
    dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    recipients?: Prisma.NotificationRecipientUpdateManyWithoutNotificationNestedInput;
};
export type NotificationUncheckedUpdateWithoutOccurrenceInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    key?: Prisma.StringFieldUpdateOperationsInput | string;
    kind?: Prisma.EnumNotificationKindFieldUpdateOperationsInput | $Enums.NotificationKind;
    dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    recipients?: Prisma.NotificationRecipientUncheckedUpdateManyWithoutNotificationNestedInput;
};
export type NotificationUncheckedUpdateManyWithoutOccurrenceInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    key?: Prisma.StringFieldUpdateOperationsInput | string;
    kind?: Prisma.EnumNotificationKindFieldUpdateOperationsInput | $Enums.NotificationKind;
    dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
/**
 * Count Type NotificationCountOutputType
 */
export type NotificationCountOutputType = {
    recipients: number;
};
export type NotificationCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    recipients?: boolean | NotificationCountOutputTypeCountRecipientsArgs;
};
/**
 * NotificationCountOutputType without action
 */
export type NotificationCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationCountOutputType
     */
    select?: Prisma.NotificationCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * NotificationCountOutputType without action
 */
export type NotificationCountOutputTypeCountRecipientsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.NotificationRecipientWhereInput;
};
export type NotificationSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    key?: boolean;
    occurrenceId?: boolean;
    kind?: boolean;
    dueDate?: boolean;
    title?: boolean;
    message?: boolean;
    createdAt?: boolean;
    occurrence?: boolean | Prisma.Notification$occurrenceArgs<ExtArgs>;
    recipients?: boolean | Prisma.Notification$recipientsArgs<ExtArgs>;
    _count?: boolean | Prisma.NotificationCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["notification"]>;
export type NotificationSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    key?: boolean;
    occurrenceId?: boolean;
    kind?: boolean;
    dueDate?: boolean;
    title?: boolean;
    message?: boolean;
    createdAt?: boolean;
    occurrence?: boolean | Prisma.Notification$occurrenceArgs<ExtArgs>;
}, ExtArgs["result"]["notification"]>;
export type NotificationSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    key?: boolean;
    occurrenceId?: boolean;
    kind?: boolean;
    dueDate?: boolean;
    title?: boolean;
    message?: boolean;
    createdAt?: boolean;
    occurrence?: boolean | Prisma.Notification$occurrenceArgs<ExtArgs>;
}, ExtArgs["result"]["notification"]>;
export type NotificationSelectScalar = {
    id?: boolean;
    key?: boolean;
    occurrenceId?: boolean;
    kind?: boolean;
    dueDate?: boolean;
    title?: boolean;
    message?: boolean;
    createdAt?: boolean;
};
export type NotificationOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "key" | "occurrenceId" | "kind" | "dueDate" | "title" | "message" | "createdAt", ExtArgs["result"]["notification"]>;
export type NotificationInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    occurrence?: boolean | Prisma.Notification$occurrenceArgs<ExtArgs>;
    recipients?: boolean | Prisma.Notification$recipientsArgs<ExtArgs>;
    _count?: boolean | Prisma.NotificationCountOutputTypeDefaultArgs<ExtArgs>;
};
export type NotificationIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    occurrence?: boolean | Prisma.Notification$occurrenceArgs<ExtArgs>;
};
export type NotificationIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    occurrence?: boolean | Prisma.Notification$occurrenceArgs<ExtArgs>;
};
export type $NotificationPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Notification";
    objects: {
        occurrence: Prisma.$MaintenanceOccurrencePayload<ExtArgs> | null;
        recipients: Prisma.$NotificationRecipientPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        key: string;
        occurrenceId: number | null;
        kind: $Enums.NotificationKind;
        dueDate: Date;
        title: string;
        message: string;
        createdAt: Date;
    }, ExtArgs["result"]["notification"]>;
    composites: {};
};
export type NotificationGetPayload<S extends boolean | null | undefined | NotificationDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$NotificationPayload, S>;
export type NotificationCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<NotificationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: NotificationCountAggregateInputType | true;
};
export interface NotificationDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Notification'];
        meta: {
            name: 'Notification';
        };
    };
    /**
     * Find zero or one Notification that matches the filter.
     * @param {NotificationFindUniqueArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NotificationFindUniqueArgs>(args: Prisma.SelectSubset<T, NotificationFindUniqueArgs<ExtArgs>>): Prisma.Prisma__NotificationClient<runtime.Types.Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one Notification that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {NotificationFindUniqueOrThrowArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NotificationFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, NotificationFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__NotificationClient<runtime.Types.Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Notification that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindFirstArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NotificationFindFirstArgs>(args?: Prisma.SelectSubset<T, NotificationFindFirstArgs<ExtArgs>>): Prisma.Prisma__NotificationClient<runtime.Types.Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Notification that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindFirstOrThrowArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NotificationFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, NotificationFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__NotificationClient<runtime.Types.Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Notifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Notifications
     * const notifications = await prisma.notification.findMany()
     *
     * // Get first 10 Notifications
     * const notifications = await prisma.notification.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const notificationWithIdOnly = await prisma.notification.findMany({ select: { id: true } })
     *
     */
    findMany<T extends NotificationFindManyArgs>(args?: Prisma.SelectSubset<T, NotificationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a Notification.
     * @param {NotificationCreateArgs} args - Arguments to create a Notification.
     * @example
     * // Create one Notification
     * const Notification = await prisma.notification.create({
     *   data: {
     *     // ... data to create a Notification
     *   }
     * })
     *
     */
    create<T extends NotificationCreateArgs>(args: Prisma.SelectSubset<T, NotificationCreateArgs<ExtArgs>>): Prisma.Prisma__NotificationClient<runtime.Types.Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Notifications.
     * @param {NotificationCreateManyArgs} args - Arguments to create many Notifications.
     * @example
     * // Create many Notifications
     * const notification = await prisma.notification.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends NotificationCreateManyArgs>(args?: Prisma.SelectSubset<T, NotificationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many Notifications and returns the data saved in the database.
     * @param {NotificationCreateManyAndReturnArgs} args - Arguments to create many Notifications.
     * @example
     * // Create many Notifications
     * const notification = await prisma.notification.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Notifications and only return the `id`
     * const notificationWithIdOnly = await prisma.notification.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends NotificationCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, NotificationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a Notification.
     * @param {NotificationDeleteArgs} args - Arguments to delete one Notification.
     * @example
     * // Delete one Notification
     * const Notification = await prisma.notification.delete({
     *   where: {
     *     // ... filter to delete one Notification
     *   }
     * })
     *
     */
    delete<T extends NotificationDeleteArgs>(args: Prisma.SelectSubset<T, NotificationDeleteArgs<ExtArgs>>): Prisma.Prisma__NotificationClient<runtime.Types.Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one Notification.
     * @param {NotificationUpdateArgs} args - Arguments to update one Notification.
     * @example
     * // Update one Notification
     * const notification = await prisma.notification.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends NotificationUpdateArgs>(args: Prisma.SelectSubset<T, NotificationUpdateArgs<ExtArgs>>): Prisma.Prisma__NotificationClient<runtime.Types.Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Notifications.
     * @param {NotificationDeleteManyArgs} args - Arguments to filter Notifications to delete.
     * @example
     * // Delete a few Notifications
     * const { count } = await prisma.notification.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends NotificationDeleteManyArgs>(args?: Prisma.SelectSubset<T, NotificationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Notifications
     * const notification = await prisma.notification.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends NotificationUpdateManyArgs>(args: Prisma.SelectSubset<T, NotificationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Notifications and returns the data updated in the database.
     * @param {NotificationUpdateManyAndReturnArgs} args - Arguments to update many Notifications.
     * @example
     * // Update many Notifications
     * const notification = await prisma.notification.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Notifications and only return the `id`
     * const notificationWithIdOnly = await prisma.notification.updateManyAndReturn({
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
    updateManyAndReturn<T extends NotificationUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, NotificationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one Notification.
     * @param {NotificationUpsertArgs} args - Arguments to update or create a Notification.
     * @example
     * // Update or create a Notification
     * const notification = await prisma.notification.upsert({
     *   create: {
     *     // ... data to create a Notification
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Notification we want to update
     *   }
     * })
     */
    upsert<T extends NotificationUpsertArgs>(args: Prisma.SelectSubset<T, NotificationUpsertArgs<ExtArgs>>): Prisma.Prisma__NotificationClient<runtime.Types.Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationCountArgs} args - Arguments to filter Notifications to count.
     * @example
     * // Count the number of Notifications
     * const count = await prisma.notification.count({
     *   where: {
     *     // ... the filter for the Notifications we want to count
     *   }
     * })
    **/
    count<T extends NotificationCountArgs>(args?: Prisma.Subset<T, NotificationCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], NotificationCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a Notification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends NotificationAggregateArgs>(args: Prisma.Subset<T, NotificationAggregateArgs>): Prisma.PrismaPromise<GetNotificationAggregateType<T>>;
    /**
     * Group by Notification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationGroupByArgs} args - Group by arguments.
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
    groupBy<T extends NotificationGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: NotificationGroupByArgs['orderBy'];
    } : {
        orderBy?: NotificationGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, NotificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNotificationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Notification model
     */
    readonly fields: NotificationFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for Notification.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__NotificationClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    occurrence<T extends Prisma.Notification$occurrenceArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Notification$occurrenceArgs<ExtArgs>>): Prisma.Prisma__MaintenanceOccurrenceClient<runtime.Types.Result.GetResult<Prisma.$MaintenanceOccurrencePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    recipients<T extends Prisma.Notification$recipientsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Notification$recipientsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$NotificationRecipientPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
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
 * Fields of the Notification model
 */
export interface NotificationFieldRefs {
    readonly id: Prisma.FieldRef<"Notification", 'Int'>;
    readonly key: Prisma.FieldRef<"Notification", 'String'>;
    readonly occurrenceId: Prisma.FieldRef<"Notification", 'Int'>;
    readonly kind: Prisma.FieldRef<"Notification", 'NotificationKind'>;
    readonly dueDate: Prisma.FieldRef<"Notification", 'DateTime'>;
    readonly title: Prisma.FieldRef<"Notification", 'String'>;
    readonly message: Prisma.FieldRef<"Notification", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Notification", 'DateTime'>;
}
/**
 * Notification findUnique
 */
export type NotificationFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which Notification to fetch.
     */
    where: Prisma.NotificationWhereUniqueInput;
};
/**
 * Notification findUniqueOrThrow
 */
export type NotificationFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which Notification to fetch.
     */
    where: Prisma.NotificationWhereUniqueInput;
};
/**
 * Notification findFirst
 */
export type NotificationFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which Notification to fetch.
     */
    where?: Prisma.NotificationWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Notifications to fetch.
     */
    orderBy?: Prisma.NotificationOrderByWithRelationInput | Prisma.NotificationOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Notifications.
     */
    cursor?: Prisma.NotificationWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Notifications.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Notifications.
     */
    distinct?: Prisma.NotificationScalarFieldEnum | Prisma.NotificationScalarFieldEnum[];
};
/**
 * Notification findFirstOrThrow
 */
export type NotificationFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which Notification to fetch.
     */
    where?: Prisma.NotificationWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Notifications to fetch.
     */
    orderBy?: Prisma.NotificationOrderByWithRelationInput | Prisma.NotificationOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Notifications.
     */
    cursor?: Prisma.NotificationWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Notifications.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Notifications.
     */
    distinct?: Prisma.NotificationScalarFieldEnum | Prisma.NotificationScalarFieldEnum[];
};
/**
 * Notification findMany
 */
export type NotificationFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which Notifications to fetch.
     */
    where?: Prisma.NotificationWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Notifications to fetch.
     */
    orderBy?: Prisma.NotificationOrderByWithRelationInput | Prisma.NotificationOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Notifications.
     */
    cursor?: Prisma.NotificationWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Notifications.
     */
    skip?: number;
    distinct?: Prisma.NotificationScalarFieldEnum | Prisma.NotificationScalarFieldEnum[];
};
/**
 * Notification create
 */
export type NotificationCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to create a Notification.
     */
    data: Prisma.XOR<Prisma.NotificationCreateInput, Prisma.NotificationUncheckedCreateInput>;
};
/**
 * Notification createMany
 */
export type NotificationCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many Notifications.
     */
    data: Prisma.NotificationCreateManyInput | Prisma.NotificationCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * Notification createManyAndReturn
 */
export type NotificationCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: Prisma.NotificationSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Notification
     */
    omit?: Prisma.NotificationOmit<ExtArgs> | null;
    /**
     * The data used to create many Notifications.
     */
    data: Prisma.NotificationCreateManyInput | Prisma.NotificationCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.NotificationIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * Notification update
 */
export type NotificationUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to update a Notification.
     */
    data: Prisma.XOR<Prisma.NotificationUpdateInput, Prisma.NotificationUncheckedUpdateInput>;
    /**
     * Choose, which Notification to update.
     */
    where: Prisma.NotificationWhereUniqueInput;
};
/**
 * Notification updateMany
 */
export type NotificationUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update Notifications.
     */
    data: Prisma.XOR<Prisma.NotificationUpdateManyMutationInput, Prisma.NotificationUncheckedUpdateManyInput>;
    /**
     * Filter which Notifications to update
     */
    where?: Prisma.NotificationWhereInput;
    /**
     * Limit how many Notifications to update.
     */
    limit?: number;
};
/**
 * Notification updateManyAndReturn
 */
export type NotificationUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: Prisma.NotificationSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Notification
     */
    omit?: Prisma.NotificationOmit<ExtArgs> | null;
    /**
     * The data used to update Notifications.
     */
    data: Prisma.XOR<Prisma.NotificationUpdateManyMutationInput, Prisma.NotificationUncheckedUpdateManyInput>;
    /**
     * Filter which Notifications to update
     */
    where?: Prisma.NotificationWhereInput;
    /**
     * Limit how many Notifications to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.NotificationIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * Notification upsert
 */
export type NotificationUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The filter to search for the Notification to update in case it exists.
     */
    where: Prisma.NotificationWhereUniqueInput;
    /**
     * In case the Notification found by the `where` argument doesn't exist, create a new Notification with this data.
     */
    create: Prisma.XOR<Prisma.NotificationCreateInput, Prisma.NotificationUncheckedCreateInput>;
    /**
     * In case the Notification was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.NotificationUpdateInput, Prisma.NotificationUncheckedUpdateInput>;
};
/**
 * Notification delete
 */
export type NotificationDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter which Notification to delete.
     */
    where: Prisma.NotificationWhereUniqueInput;
};
/**
 * Notification deleteMany
 */
export type NotificationDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Notifications to delete
     */
    where?: Prisma.NotificationWhereInput;
    /**
     * Limit how many Notifications to delete.
     */
    limit?: number;
};
/**
 * Notification.occurrence
 */
export type Notification$occurrenceArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * Notification.recipients
 */
export type Notification$recipientsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationRecipient
     */
    select?: Prisma.NotificationRecipientSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the NotificationRecipient
     */
    omit?: Prisma.NotificationRecipientOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.NotificationRecipientInclude<ExtArgs> | null;
    where?: Prisma.NotificationRecipientWhereInput;
    orderBy?: Prisma.NotificationRecipientOrderByWithRelationInput | Prisma.NotificationRecipientOrderByWithRelationInput[];
    cursor?: Prisma.NotificationRecipientWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.NotificationRecipientScalarFieldEnum | Prisma.NotificationRecipientScalarFieldEnum[];
};
/**
 * Notification without action
 */
export type NotificationDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
};
export {};
//# sourceMappingURL=Notification.d.ts.map