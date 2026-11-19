import type * as runtime from "@prisma/client/runtime/library";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model WorkOrderNumberCounter
 *
 */
export type WorkOrderNumberCounterModel = runtime.Types.Result.DefaultSelection<Prisma.$WorkOrderNumberCounterPayload>;
export type AggregateWorkOrderNumberCounter = {
    _count: WorkOrderNumberCounterCountAggregateOutputType | null;
    _avg: WorkOrderNumberCounterAvgAggregateOutputType | null;
    _sum: WorkOrderNumberCounterSumAggregateOutputType | null;
    _min: WorkOrderNumberCounterMinAggregateOutputType | null;
    _max: WorkOrderNumberCounterMaxAggregateOutputType | null;
};
export type WorkOrderNumberCounterAvgAggregateOutputType = {
    year: number | null;
    lastNumber: number | null;
};
export type WorkOrderNumberCounterSumAggregateOutputType = {
    year: number | null;
    lastNumber: number | null;
};
export type WorkOrderNumberCounterMinAggregateOutputType = {
    year: number | null;
    lastNumber: number | null;
    updatedAt: Date | null;
};
export type WorkOrderNumberCounterMaxAggregateOutputType = {
    year: number | null;
    lastNumber: number | null;
    updatedAt: Date | null;
};
export type WorkOrderNumberCounterCountAggregateOutputType = {
    year: number;
    lastNumber: number;
    updatedAt: number;
    _all: number;
};
export type WorkOrderNumberCounterAvgAggregateInputType = {
    year?: true;
    lastNumber?: true;
};
export type WorkOrderNumberCounterSumAggregateInputType = {
    year?: true;
    lastNumber?: true;
};
export type WorkOrderNumberCounterMinAggregateInputType = {
    year?: true;
    lastNumber?: true;
    updatedAt?: true;
};
export type WorkOrderNumberCounterMaxAggregateInputType = {
    year?: true;
    lastNumber?: true;
    updatedAt?: true;
};
export type WorkOrderNumberCounterCountAggregateInputType = {
    year?: true;
    lastNumber?: true;
    updatedAt?: true;
    _all?: true;
};
export type WorkOrderNumberCounterAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which WorkOrderNumberCounter to aggregate.
     */
    where?: Prisma.WorkOrderNumberCounterWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of WorkOrderNumberCounters to fetch.
     */
    orderBy?: Prisma.WorkOrderNumberCounterOrderByWithRelationInput | Prisma.WorkOrderNumberCounterOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.WorkOrderNumberCounterWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` WorkOrderNumberCounters from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` WorkOrderNumberCounters.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned WorkOrderNumberCounters
    **/
    _count?: true | WorkOrderNumberCounterCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: WorkOrderNumberCounterAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: WorkOrderNumberCounterSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: WorkOrderNumberCounterMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: WorkOrderNumberCounterMaxAggregateInputType;
};
export type GetWorkOrderNumberCounterAggregateType<T extends WorkOrderNumberCounterAggregateArgs> = {
    [P in keyof T & keyof AggregateWorkOrderNumberCounter]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateWorkOrderNumberCounter[P]> : Prisma.GetScalarType<T[P], AggregateWorkOrderNumberCounter[P]>;
};
export type WorkOrderNumberCounterGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.WorkOrderNumberCounterWhereInput;
    orderBy?: Prisma.WorkOrderNumberCounterOrderByWithAggregationInput | Prisma.WorkOrderNumberCounterOrderByWithAggregationInput[];
    by: Prisma.WorkOrderNumberCounterScalarFieldEnum[] | Prisma.WorkOrderNumberCounterScalarFieldEnum;
    having?: Prisma.WorkOrderNumberCounterScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: WorkOrderNumberCounterCountAggregateInputType | true;
    _avg?: WorkOrderNumberCounterAvgAggregateInputType;
    _sum?: WorkOrderNumberCounterSumAggregateInputType;
    _min?: WorkOrderNumberCounterMinAggregateInputType;
    _max?: WorkOrderNumberCounterMaxAggregateInputType;
};
export type WorkOrderNumberCounterGroupByOutputType = {
    year: number;
    lastNumber: number;
    updatedAt: Date;
    _count: WorkOrderNumberCounterCountAggregateOutputType | null;
    _avg: WorkOrderNumberCounterAvgAggregateOutputType | null;
    _sum: WorkOrderNumberCounterSumAggregateOutputType | null;
    _min: WorkOrderNumberCounterMinAggregateOutputType | null;
    _max: WorkOrderNumberCounterMaxAggregateOutputType | null;
};
type GetWorkOrderNumberCounterGroupByPayload<T extends WorkOrderNumberCounterGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<WorkOrderNumberCounterGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof WorkOrderNumberCounterGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], WorkOrderNumberCounterGroupByOutputType[P]> : Prisma.GetScalarType<T[P], WorkOrderNumberCounterGroupByOutputType[P]>;
}>>;
export type WorkOrderNumberCounterWhereInput = {
    AND?: Prisma.WorkOrderNumberCounterWhereInput | Prisma.WorkOrderNumberCounterWhereInput[];
    OR?: Prisma.WorkOrderNumberCounterWhereInput[];
    NOT?: Prisma.WorkOrderNumberCounterWhereInput | Prisma.WorkOrderNumberCounterWhereInput[];
    year?: Prisma.IntFilter<"WorkOrderNumberCounter"> | number;
    lastNumber?: Prisma.IntFilter<"WorkOrderNumberCounter"> | number;
    updatedAt?: Prisma.DateTimeFilter<"WorkOrderNumberCounter"> | Date | string;
};
export type WorkOrderNumberCounterOrderByWithRelationInput = {
    year?: Prisma.SortOrder;
    lastNumber?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type WorkOrderNumberCounterWhereUniqueInput = Prisma.AtLeast<{
    year?: number;
    AND?: Prisma.WorkOrderNumberCounterWhereInput | Prisma.WorkOrderNumberCounterWhereInput[];
    OR?: Prisma.WorkOrderNumberCounterWhereInput[];
    NOT?: Prisma.WorkOrderNumberCounterWhereInput | Prisma.WorkOrderNumberCounterWhereInput[];
    lastNumber?: Prisma.IntFilter<"WorkOrderNumberCounter"> | number;
    updatedAt?: Prisma.DateTimeFilter<"WorkOrderNumberCounter"> | Date | string;
}, "year">;
export type WorkOrderNumberCounterOrderByWithAggregationInput = {
    year?: Prisma.SortOrder;
    lastNumber?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.WorkOrderNumberCounterCountOrderByAggregateInput;
    _avg?: Prisma.WorkOrderNumberCounterAvgOrderByAggregateInput;
    _max?: Prisma.WorkOrderNumberCounterMaxOrderByAggregateInput;
    _min?: Prisma.WorkOrderNumberCounterMinOrderByAggregateInput;
    _sum?: Prisma.WorkOrderNumberCounterSumOrderByAggregateInput;
};
export type WorkOrderNumberCounterScalarWhereWithAggregatesInput = {
    AND?: Prisma.WorkOrderNumberCounterScalarWhereWithAggregatesInput | Prisma.WorkOrderNumberCounterScalarWhereWithAggregatesInput[];
    OR?: Prisma.WorkOrderNumberCounterScalarWhereWithAggregatesInput[];
    NOT?: Prisma.WorkOrderNumberCounterScalarWhereWithAggregatesInput | Prisma.WorkOrderNumberCounterScalarWhereWithAggregatesInput[];
    year?: Prisma.IntWithAggregatesFilter<"WorkOrderNumberCounter"> | number;
    lastNumber?: Prisma.IntWithAggregatesFilter<"WorkOrderNumberCounter"> | number;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"WorkOrderNumberCounter"> | Date | string;
};
export type WorkOrderNumberCounterCreateInput = {
    year: number;
    lastNumber?: number;
    updatedAt?: Date | string;
};
export type WorkOrderNumberCounterUncheckedCreateInput = {
    year: number;
    lastNumber?: number;
    updatedAt?: Date | string;
};
export type WorkOrderNumberCounterUpdateInput = {
    year?: Prisma.IntFieldUpdateOperationsInput | number;
    lastNumber?: Prisma.IntFieldUpdateOperationsInput | number;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type WorkOrderNumberCounterUncheckedUpdateInput = {
    year?: Prisma.IntFieldUpdateOperationsInput | number;
    lastNumber?: Prisma.IntFieldUpdateOperationsInput | number;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type WorkOrderNumberCounterCreateManyInput = {
    year: number;
    lastNumber?: number;
    updatedAt?: Date | string;
};
export type WorkOrderNumberCounterUpdateManyMutationInput = {
    year?: Prisma.IntFieldUpdateOperationsInput | number;
    lastNumber?: Prisma.IntFieldUpdateOperationsInput | number;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type WorkOrderNumberCounterUncheckedUpdateManyInput = {
    year?: Prisma.IntFieldUpdateOperationsInput | number;
    lastNumber?: Prisma.IntFieldUpdateOperationsInput | number;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type WorkOrderNumberCounterCountOrderByAggregateInput = {
    year?: Prisma.SortOrder;
    lastNumber?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type WorkOrderNumberCounterAvgOrderByAggregateInput = {
    year?: Prisma.SortOrder;
    lastNumber?: Prisma.SortOrder;
};
export type WorkOrderNumberCounterMaxOrderByAggregateInput = {
    year?: Prisma.SortOrder;
    lastNumber?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type WorkOrderNumberCounterMinOrderByAggregateInput = {
    year?: Prisma.SortOrder;
    lastNumber?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type WorkOrderNumberCounterSumOrderByAggregateInput = {
    year?: Prisma.SortOrder;
    lastNumber?: Prisma.SortOrder;
};
export type WorkOrderNumberCounterSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    year?: boolean;
    lastNumber?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["workOrderNumberCounter"]>;
export type WorkOrderNumberCounterSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    year?: boolean;
    lastNumber?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["workOrderNumberCounter"]>;
export type WorkOrderNumberCounterSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    year?: boolean;
    lastNumber?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["workOrderNumberCounter"]>;
export type WorkOrderNumberCounterSelectScalar = {
    year?: boolean;
    lastNumber?: boolean;
    updatedAt?: boolean;
};
export type WorkOrderNumberCounterOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"year" | "lastNumber" | "updatedAt", ExtArgs["result"]["workOrderNumberCounter"]>;
export type $WorkOrderNumberCounterPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "WorkOrderNumberCounter";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        year: number;
        lastNumber: number;
        updatedAt: Date;
    }, ExtArgs["result"]["workOrderNumberCounter"]>;
    composites: {};
};
export type WorkOrderNumberCounterGetPayload<S extends boolean | null | undefined | WorkOrderNumberCounterDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$WorkOrderNumberCounterPayload, S>;
export type WorkOrderNumberCounterCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<WorkOrderNumberCounterFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: WorkOrderNumberCounterCountAggregateInputType | true;
};
export interface WorkOrderNumberCounterDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['WorkOrderNumberCounter'];
        meta: {
            name: 'WorkOrderNumberCounter';
        };
    };
    /**
     * Find zero or one WorkOrderNumberCounter that matches the filter.
     * @param {WorkOrderNumberCounterFindUniqueArgs} args - Arguments to find a WorkOrderNumberCounter
     * @example
     * // Get one WorkOrderNumberCounter
     * const workOrderNumberCounter = await prisma.workOrderNumberCounter.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WorkOrderNumberCounterFindUniqueArgs>(args: Prisma.SelectSubset<T, WorkOrderNumberCounterFindUniqueArgs<ExtArgs>>): Prisma.Prisma__WorkOrderNumberCounterClient<runtime.Types.Result.GetResult<Prisma.$WorkOrderNumberCounterPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one WorkOrderNumberCounter that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WorkOrderNumberCounterFindUniqueOrThrowArgs} args - Arguments to find a WorkOrderNumberCounter
     * @example
     * // Get one WorkOrderNumberCounter
     * const workOrderNumberCounter = await prisma.workOrderNumberCounter.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WorkOrderNumberCounterFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, WorkOrderNumberCounterFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__WorkOrderNumberCounterClient<runtime.Types.Result.GetResult<Prisma.$WorkOrderNumberCounterPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first WorkOrderNumberCounter that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkOrderNumberCounterFindFirstArgs} args - Arguments to find a WorkOrderNumberCounter
     * @example
     * // Get one WorkOrderNumberCounter
     * const workOrderNumberCounter = await prisma.workOrderNumberCounter.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WorkOrderNumberCounterFindFirstArgs>(args?: Prisma.SelectSubset<T, WorkOrderNumberCounterFindFirstArgs<ExtArgs>>): Prisma.Prisma__WorkOrderNumberCounterClient<runtime.Types.Result.GetResult<Prisma.$WorkOrderNumberCounterPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first WorkOrderNumberCounter that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkOrderNumberCounterFindFirstOrThrowArgs} args - Arguments to find a WorkOrderNumberCounter
     * @example
     * // Get one WorkOrderNumberCounter
     * const workOrderNumberCounter = await prisma.workOrderNumberCounter.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WorkOrderNumberCounterFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, WorkOrderNumberCounterFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__WorkOrderNumberCounterClient<runtime.Types.Result.GetResult<Prisma.$WorkOrderNumberCounterPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more WorkOrderNumberCounters that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkOrderNumberCounterFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WorkOrderNumberCounters
     * const workOrderNumberCounters = await prisma.workOrderNumberCounter.findMany()
     *
     * // Get first 10 WorkOrderNumberCounters
     * const workOrderNumberCounters = await prisma.workOrderNumberCounter.findMany({ take: 10 })
     *
     * // Only select the `year`
     * const workOrderNumberCounterWithYearOnly = await prisma.workOrderNumberCounter.findMany({ select: { year: true } })
     *
     */
    findMany<T extends WorkOrderNumberCounterFindManyArgs>(args?: Prisma.SelectSubset<T, WorkOrderNumberCounterFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WorkOrderNumberCounterPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a WorkOrderNumberCounter.
     * @param {WorkOrderNumberCounterCreateArgs} args - Arguments to create a WorkOrderNumberCounter.
     * @example
     * // Create one WorkOrderNumberCounter
     * const WorkOrderNumberCounter = await prisma.workOrderNumberCounter.create({
     *   data: {
     *     // ... data to create a WorkOrderNumberCounter
     *   }
     * })
     *
     */
    create<T extends WorkOrderNumberCounterCreateArgs>(args: Prisma.SelectSubset<T, WorkOrderNumberCounterCreateArgs<ExtArgs>>): Prisma.Prisma__WorkOrderNumberCounterClient<runtime.Types.Result.GetResult<Prisma.$WorkOrderNumberCounterPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many WorkOrderNumberCounters.
     * @param {WorkOrderNumberCounterCreateManyArgs} args - Arguments to create many WorkOrderNumberCounters.
     * @example
     * // Create many WorkOrderNumberCounters
     * const workOrderNumberCounter = await prisma.workOrderNumberCounter.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends WorkOrderNumberCounterCreateManyArgs>(args?: Prisma.SelectSubset<T, WorkOrderNumberCounterCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many WorkOrderNumberCounters and returns the data saved in the database.
     * @param {WorkOrderNumberCounterCreateManyAndReturnArgs} args - Arguments to create many WorkOrderNumberCounters.
     * @example
     * // Create many WorkOrderNumberCounters
     * const workOrderNumberCounter = await prisma.workOrderNumberCounter.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many WorkOrderNumberCounters and only return the `year`
     * const workOrderNumberCounterWithYearOnly = await prisma.workOrderNumberCounter.createManyAndReturn({
     *   select: { year: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends WorkOrderNumberCounterCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, WorkOrderNumberCounterCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WorkOrderNumberCounterPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a WorkOrderNumberCounter.
     * @param {WorkOrderNumberCounterDeleteArgs} args - Arguments to delete one WorkOrderNumberCounter.
     * @example
     * // Delete one WorkOrderNumberCounter
     * const WorkOrderNumberCounter = await prisma.workOrderNumberCounter.delete({
     *   where: {
     *     // ... filter to delete one WorkOrderNumberCounter
     *   }
     * })
     *
     */
    delete<T extends WorkOrderNumberCounterDeleteArgs>(args: Prisma.SelectSubset<T, WorkOrderNumberCounterDeleteArgs<ExtArgs>>): Prisma.Prisma__WorkOrderNumberCounterClient<runtime.Types.Result.GetResult<Prisma.$WorkOrderNumberCounterPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one WorkOrderNumberCounter.
     * @param {WorkOrderNumberCounterUpdateArgs} args - Arguments to update one WorkOrderNumberCounter.
     * @example
     * // Update one WorkOrderNumberCounter
     * const workOrderNumberCounter = await prisma.workOrderNumberCounter.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends WorkOrderNumberCounterUpdateArgs>(args: Prisma.SelectSubset<T, WorkOrderNumberCounterUpdateArgs<ExtArgs>>): Prisma.Prisma__WorkOrderNumberCounterClient<runtime.Types.Result.GetResult<Prisma.$WorkOrderNumberCounterPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more WorkOrderNumberCounters.
     * @param {WorkOrderNumberCounterDeleteManyArgs} args - Arguments to filter WorkOrderNumberCounters to delete.
     * @example
     * // Delete a few WorkOrderNumberCounters
     * const { count } = await prisma.workOrderNumberCounter.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends WorkOrderNumberCounterDeleteManyArgs>(args?: Prisma.SelectSubset<T, WorkOrderNumberCounterDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more WorkOrderNumberCounters.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkOrderNumberCounterUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WorkOrderNumberCounters
     * const workOrderNumberCounter = await prisma.workOrderNumberCounter.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends WorkOrderNumberCounterUpdateManyArgs>(args: Prisma.SelectSubset<T, WorkOrderNumberCounterUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more WorkOrderNumberCounters and returns the data updated in the database.
     * @param {WorkOrderNumberCounterUpdateManyAndReturnArgs} args - Arguments to update many WorkOrderNumberCounters.
     * @example
     * // Update many WorkOrderNumberCounters
     * const workOrderNumberCounter = await prisma.workOrderNumberCounter.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more WorkOrderNumberCounters and only return the `year`
     * const workOrderNumberCounterWithYearOnly = await prisma.workOrderNumberCounter.updateManyAndReturn({
     *   select: { year: true },
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
    updateManyAndReturn<T extends WorkOrderNumberCounterUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, WorkOrderNumberCounterUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WorkOrderNumberCounterPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one WorkOrderNumberCounter.
     * @param {WorkOrderNumberCounterUpsertArgs} args - Arguments to update or create a WorkOrderNumberCounter.
     * @example
     * // Update or create a WorkOrderNumberCounter
     * const workOrderNumberCounter = await prisma.workOrderNumberCounter.upsert({
     *   create: {
     *     // ... data to create a WorkOrderNumberCounter
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WorkOrderNumberCounter we want to update
     *   }
     * })
     */
    upsert<T extends WorkOrderNumberCounterUpsertArgs>(args: Prisma.SelectSubset<T, WorkOrderNumberCounterUpsertArgs<ExtArgs>>): Prisma.Prisma__WorkOrderNumberCounterClient<runtime.Types.Result.GetResult<Prisma.$WorkOrderNumberCounterPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of WorkOrderNumberCounters.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkOrderNumberCounterCountArgs} args - Arguments to filter WorkOrderNumberCounters to count.
     * @example
     * // Count the number of WorkOrderNumberCounters
     * const count = await prisma.workOrderNumberCounter.count({
     *   where: {
     *     // ... the filter for the WorkOrderNumberCounters we want to count
     *   }
     * })
    **/
    count<T extends WorkOrderNumberCounterCountArgs>(args?: Prisma.Subset<T, WorkOrderNumberCounterCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], WorkOrderNumberCounterCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a WorkOrderNumberCounter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkOrderNumberCounterAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends WorkOrderNumberCounterAggregateArgs>(args: Prisma.Subset<T, WorkOrderNumberCounterAggregateArgs>): Prisma.PrismaPromise<GetWorkOrderNumberCounterAggregateType<T>>;
    /**
     * Group by WorkOrderNumberCounter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkOrderNumberCounterGroupByArgs} args - Group by arguments.
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
    groupBy<T extends WorkOrderNumberCounterGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: WorkOrderNumberCounterGroupByArgs['orderBy'];
    } : {
        orderBy?: WorkOrderNumberCounterGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, WorkOrderNumberCounterGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWorkOrderNumberCounterGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the WorkOrderNumberCounter model
     */
    readonly fields: WorkOrderNumberCounterFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for WorkOrderNumberCounter.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__WorkOrderNumberCounterClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
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
 * Fields of the WorkOrderNumberCounter model
 */
export interface WorkOrderNumberCounterFieldRefs {
    readonly year: Prisma.FieldRef<"WorkOrderNumberCounter", 'Int'>;
    readonly lastNumber: Prisma.FieldRef<"WorkOrderNumberCounter", 'Int'>;
    readonly updatedAt: Prisma.FieldRef<"WorkOrderNumberCounter", 'DateTime'>;
}
/**
 * WorkOrderNumberCounter findUnique
 */
export type WorkOrderNumberCounterFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkOrderNumberCounter
     */
    select?: Prisma.WorkOrderNumberCounterSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the WorkOrderNumberCounter
     */
    omit?: Prisma.WorkOrderNumberCounterOmit<ExtArgs> | null;
    /**
     * Filter, which WorkOrderNumberCounter to fetch.
     */
    where: Prisma.WorkOrderNumberCounterWhereUniqueInput;
};
/**
 * WorkOrderNumberCounter findUniqueOrThrow
 */
export type WorkOrderNumberCounterFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkOrderNumberCounter
     */
    select?: Prisma.WorkOrderNumberCounterSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the WorkOrderNumberCounter
     */
    omit?: Prisma.WorkOrderNumberCounterOmit<ExtArgs> | null;
    /**
     * Filter, which WorkOrderNumberCounter to fetch.
     */
    where: Prisma.WorkOrderNumberCounterWhereUniqueInput;
};
/**
 * WorkOrderNumberCounter findFirst
 */
export type WorkOrderNumberCounterFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkOrderNumberCounter
     */
    select?: Prisma.WorkOrderNumberCounterSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the WorkOrderNumberCounter
     */
    omit?: Prisma.WorkOrderNumberCounterOmit<ExtArgs> | null;
    /**
     * Filter, which WorkOrderNumberCounter to fetch.
     */
    where?: Prisma.WorkOrderNumberCounterWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of WorkOrderNumberCounters to fetch.
     */
    orderBy?: Prisma.WorkOrderNumberCounterOrderByWithRelationInput | Prisma.WorkOrderNumberCounterOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for WorkOrderNumberCounters.
     */
    cursor?: Prisma.WorkOrderNumberCounterWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` WorkOrderNumberCounters from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` WorkOrderNumberCounters.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of WorkOrderNumberCounters.
     */
    distinct?: Prisma.WorkOrderNumberCounterScalarFieldEnum | Prisma.WorkOrderNumberCounterScalarFieldEnum[];
};
/**
 * WorkOrderNumberCounter findFirstOrThrow
 */
export type WorkOrderNumberCounterFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkOrderNumberCounter
     */
    select?: Prisma.WorkOrderNumberCounterSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the WorkOrderNumberCounter
     */
    omit?: Prisma.WorkOrderNumberCounterOmit<ExtArgs> | null;
    /**
     * Filter, which WorkOrderNumberCounter to fetch.
     */
    where?: Prisma.WorkOrderNumberCounterWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of WorkOrderNumberCounters to fetch.
     */
    orderBy?: Prisma.WorkOrderNumberCounterOrderByWithRelationInput | Prisma.WorkOrderNumberCounterOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for WorkOrderNumberCounters.
     */
    cursor?: Prisma.WorkOrderNumberCounterWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` WorkOrderNumberCounters from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` WorkOrderNumberCounters.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of WorkOrderNumberCounters.
     */
    distinct?: Prisma.WorkOrderNumberCounterScalarFieldEnum | Prisma.WorkOrderNumberCounterScalarFieldEnum[];
};
/**
 * WorkOrderNumberCounter findMany
 */
export type WorkOrderNumberCounterFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkOrderNumberCounter
     */
    select?: Prisma.WorkOrderNumberCounterSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the WorkOrderNumberCounter
     */
    omit?: Prisma.WorkOrderNumberCounterOmit<ExtArgs> | null;
    /**
     * Filter, which WorkOrderNumberCounters to fetch.
     */
    where?: Prisma.WorkOrderNumberCounterWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of WorkOrderNumberCounters to fetch.
     */
    orderBy?: Prisma.WorkOrderNumberCounterOrderByWithRelationInput | Prisma.WorkOrderNumberCounterOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing WorkOrderNumberCounters.
     */
    cursor?: Prisma.WorkOrderNumberCounterWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` WorkOrderNumberCounters from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` WorkOrderNumberCounters.
     */
    skip?: number;
    distinct?: Prisma.WorkOrderNumberCounterScalarFieldEnum | Prisma.WorkOrderNumberCounterScalarFieldEnum[];
};
/**
 * WorkOrderNumberCounter create
 */
export type WorkOrderNumberCounterCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkOrderNumberCounter
     */
    select?: Prisma.WorkOrderNumberCounterSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the WorkOrderNumberCounter
     */
    omit?: Prisma.WorkOrderNumberCounterOmit<ExtArgs> | null;
    /**
     * The data needed to create a WorkOrderNumberCounter.
     */
    data: Prisma.XOR<Prisma.WorkOrderNumberCounterCreateInput, Prisma.WorkOrderNumberCounterUncheckedCreateInput>;
};
/**
 * WorkOrderNumberCounter createMany
 */
export type WorkOrderNumberCounterCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many WorkOrderNumberCounters.
     */
    data: Prisma.WorkOrderNumberCounterCreateManyInput | Prisma.WorkOrderNumberCounterCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * WorkOrderNumberCounter createManyAndReturn
 */
export type WorkOrderNumberCounterCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkOrderNumberCounter
     */
    select?: Prisma.WorkOrderNumberCounterSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the WorkOrderNumberCounter
     */
    omit?: Prisma.WorkOrderNumberCounterOmit<ExtArgs> | null;
    /**
     * The data used to create many WorkOrderNumberCounters.
     */
    data: Prisma.WorkOrderNumberCounterCreateManyInput | Prisma.WorkOrderNumberCounterCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * WorkOrderNumberCounter update
 */
export type WorkOrderNumberCounterUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkOrderNumberCounter
     */
    select?: Prisma.WorkOrderNumberCounterSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the WorkOrderNumberCounter
     */
    omit?: Prisma.WorkOrderNumberCounterOmit<ExtArgs> | null;
    /**
     * The data needed to update a WorkOrderNumberCounter.
     */
    data: Prisma.XOR<Prisma.WorkOrderNumberCounterUpdateInput, Prisma.WorkOrderNumberCounterUncheckedUpdateInput>;
    /**
     * Choose, which WorkOrderNumberCounter to update.
     */
    where: Prisma.WorkOrderNumberCounterWhereUniqueInput;
};
/**
 * WorkOrderNumberCounter updateMany
 */
export type WorkOrderNumberCounterUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update WorkOrderNumberCounters.
     */
    data: Prisma.XOR<Prisma.WorkOrderNumberCounterUpdateManyMutationInput, Prisma.WorkOrderNumberCounterUncheckedUpdateManyInput>;
    /**
     * Filter which WorkOrderNumberCounters to update
     */
    where?: Prisma.WorkOrderNumberCounterWhereInput;
    /**
     * Limit how many WorkOrderNumberCounters to update.
     */
    limit?: number;
};
/**
 * WorkOrderNumberCounter updateManyAndReturn
 */
export type WorkOrderNumberCounterUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkOrderNumberCounter
     */
    select?: Prisma.WorkOrderNumberCounterSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the WorkOrderNumberCounter
     */
    omit?: Prisma.WorkOrderNumberCounterOmit<ExtArgs> | null;
    /**
     * The data used to update WorkOrderNumberCounters.
     */
    data: Prisma.XOR<Prisma.WorkOrderNumberCounterUpdateManyMutationInput, Prisma.WorkOrderNumberCounterUncheckedUpdateManyInput>;
    /**
     * Filter which WorkOrderNumberCounters to update
     */
    where?: Prisma.WorkOrderNumberCounterWhereInput;
    /**
     * Limit how many WorkOrderNumberCounters to update.
     */
    limit?: number;
};
/**
 * WorkOrderNumberCounter upsert
 */
export type WorkOrderNumberCounterUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkOrderNumberCounter
     */
    select?: Prisma.WorkOrderNumberCounterSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the WorkOrderNumberCounter
     */
    omit?: Prisma.WorkOrderNumberCounterOmit<ExtArgs> | null;
    /**
     * The filter to search for the WorkOrderNumberCounter to update in case it exists.
     */
    where: Prisma.WorkOrderNumberCounterWhereUniqueInput;
    /**
     * In case the WorkOrderNumberCounter found by the `where` argument doesn't exist, create a new WorkOrderNumberCounter with this data.
     */
    create: Prisma.XOR<Prisma.WorkOrderNumberCounterCreateInput, Prisma.WorkOrderNumberCounterUncheckedCreateInput>;
    /**
     * In case the WorkOrderNumberCounter was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.WorkOrderNumberCounterUpdateInput, Prisma.WorkOrderNumberCounterUncheckedUpdateInput>;
};
/**
 * WorkOrderNumberCounter delete
 */
export type WorkOrderNumberCounterDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkOrderNumberCounter
     */
    select?: Prisma.WorkOrderNumberCounterSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the WorkOrderNumberCounter
     */
    omit?: Prisma.WorkOrderNumberCounterOmit<ExtArgs> | null;
    /**
     * Filter which WorkOrderNumberCounter to delete.
     */
    where: Prisma.WorkOrderNumberCounterWhereUniqueInput;
};
/**
 * WorkOrderNumberCounter deleteMany
 */
export type WorkOrderNumberCounterDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which WorkOrderNumberCounters to delete
     */
    where?: Prisma.WorkOrderNumberCounterWhereInput;
    /**
     * Limit how many WorkOrderNumberCounters to delete.
     */
    limit?: number;
};
/**
 * WorkOrderNumberCounter without action
 */
export type WorkOrderNumberCounterDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkOrderNumberCounter
     */
    select?: Prisma.WorkOrderNumberCounterSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the WorkOrderNumberCounter
     */
    omit?: Prisma.WorkOrderNumberCounterOmit<ExtArgs> | null;
};
export {};
//# sourceMappingURL=WorkOrderNumberCounter.d.ts.map