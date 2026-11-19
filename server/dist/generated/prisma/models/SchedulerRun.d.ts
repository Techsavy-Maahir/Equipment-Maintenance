import type * as runtime from "@prisma/client/runtime/library";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model SchedulerRun
 *
 */
export type SchedulerRunModel = runtime.Types.Result.DefaultSelection<Prisma.$SchedulerRunPayload>;
export type AggregateSchedulerRun = {
    _count: SchedulerRunCountAggregateOutputType | null;
    _avg: SchedulerRunAvgAggregateOutputType | null;
    _sum: SchedulerRunSumAggregateOutputType | null;
    _min: SchedulerRunMinAggregateOutputType | null;
    _max: SchedulerRunMaxAggregateOutputType | null;
};
export type SchedulerRunAvgAggregateOutputType = {
    id: number | null;
};
export type SchedulerRunSumAggregateOutputType = {
    id: number | null;
};
export type SchedulerRunMinAggregateOutputType = {
    id: number | null;
    jobName: string | null;
    runDate: Date | null;
    createdAt: Date | null;
};
export type SchedulerRunMaxAggregateOutputType = {
    id: number | null;
    jobName: string | null;
    runDate: Date | null;
    createdAt: Date | null;
};
export type SchedulerRunCountAggregateOutputType = {
    id: number;
    jobName: number;
    runDate: number;
    createdAt: number;
    _all: number;
};
export type SchedulerRunAvgAggregateInputType = {
    id?: true;
};
export type SchedulerRunSumAggregateInputType = {
    id?: true;
};
export type SchedulerRunMinAggregateInputType = {
    id?: true;
    jobName?: true;
    runDate?: true;
    createdAt?: true;
};
export type SchedulerRunMaxAggregateInputType = {
    id?: true;
    jobName?: true;
    runDate?: true;
    createdAt?: true;
};
export type SchedulerRunCountAggregateInputType = {
    id?: true;
    jobName?: true;
    runDate?: true;
    createdAt?: true;
    _all?: true;
};
export type SchedulerRunAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which SchedulerRun to aggregate.
     */
    where?: Prisma.SchedulerRunWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of SchedulerRuns to fetch.
     */
    orderBy?: Prisma.SchedulerRunOrderByWithRelationInput | Prisma.SchedulerRunOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.SchedulerRunWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` SchedulerRuns from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` SchedulerRuns.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned SchedulerRuns
    **/
    _count?: true | SchedulerRunCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: SchedulerRunAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: SchedulerRunSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: SchedulerRunMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: SchedulerRunMaxAggregateInputType;
};
export type GetSchedulerRunAggregateType<T extends SchedulerRunAggregateArgs> = {
    [P in keyof T & keyof AggregateSchedulerRun]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateSchedulerRun[P]> : Prisma.GetScalarType<T[P], AggregateSchedulerRun[P]>;
};
export type SchedulerRunGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SchedulerRunWhereInput;
    orderBy?: Prisma.SchedulerRunOrderByWithAggregationInput | Prisma.SchedulerRunOrderByWithAggregationInput[];
    by: Prisma.SchedulerRunScalarFieldEnum[] | Prisma.SchedulerRunScalarFieldEnum;
    having?: Prisma.SchedulerRunScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: SchedulerRunCountAggregateInputType | true;
    _avg?: SchedulerRunAvgAggregateInputType;
    _sum?: SchedulerRunSumAggregateInputType;
    _min?: SchedulerRunMinAggregateInputType;
    _max?: SchedulerRunMaxAggregateInputType;
};
export type SchedulerRunGroupByOutputType = {
    id: number;
    jobName: string;
    runDate: Date;
    createdAt: Date;
    _count: SchedulerRunCountAggregateOutputType | null;
    _avg: SchedulerRunAvgAggregateOutputType | null;
    _sum: SchedulerRunSumAggregateOutputType | null;
    _min: SchedulerRunMinAggregateOutputType | null;
    _max: SchedulerRunMaxAggregateOutputType | null;
};
type GetSchedulerRunGroupByPayload<T extends SchedulerRunGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<SchedulerRunGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof SchedulerRunGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], SchedulerRunGroupByOutputType[P]> : Prisma.GetScalarType<T[P], SchedulerRunGroupByOutputType[P]>;
}>>;
export type SchedulerRunWhereInput = {
    AND?: Prisma.SchedulerRunWhereInput | Prisma.SchedulerRunWhereInput[];
    OR?: Prisma.SchedulerRunWhereInput[];
    NOT?: Prisma.SchedulerRunWhereInput | Prisma.SchedulerRunWhereInput[];
    id?: Prisma.IntFilter<"SchedulerRun"> | number;
    jobName?: Prisma.StringFilter<"SchedulerRun"> | string;
    runDate?: Prisma.DateTimeFilter<"SchedulerRun"> | Date | string;
    createdAt?: Prisma.DateTimeFilter<"SchedulerRun"> | Date | string;
};
export type SchedulerRunOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    jobName?: Prisma.SortOrder;
    runDate?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type SchedulerRunWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    jobName_runDate?: Prisma.SchedulerRunJobNameRunDateCompoundUniqueInput;
    AND?: Prisma.SchedulerRunWhereInput | Prisma.SchedulerRunWhereInput[];
    OR?: Prisma.SchedulerRunWhereInput[];
    NOT?: Prisma.SchedulerRunWhereInput | Prisma.SchedulerRunWhereInput[];
    jobName?: Prisma.StringFilter<"SchedulerRun"> | string;
    runDate?: Prisma.DateTimeFilter<"SchedulerRun"> | Date | string;
    createdAt?: Prisma.DateTimeFilter<"SchedulerRun"> | Date | string;
}, "id" | "jobName_runDate">;
export type SchedulerRunOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    jobName?: Prisma.SortOrder;
    runDate?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.SchedulerRunCountOrderByAggregateInput;
    _avg?: Prisma.SchedulerRunAvgOrderByAggregateInput;
    _max?: Prisma.SchedulerRunMaxOrderByAggregateInput;
    _min?: Prisma.SchedulerRunMinOrderByAggregateInput;
    _sum?: Prisma.SchedulerRunSumOrderByAggregateInput;
};
export type SchedulerRunScalarWhereWithAggregatesInput = {
    AND?: Prisma.SchedulerRunScalarWhereWithAggregatesInput | Prisma.SchedulerRunScalarWhereWithAggregatesInput[];
    OR?: Prisma.SchedulerRunScalarWhereWithAggregatesInput[];
    NOT?: Prisma.SchedulerRunScalarWhereWithAggregatesInput | Prisma.SchedulerRunScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"SchedulerRun"> | number;
    jobName?: Prisma.StringWithAggregatesFilter<"SchedulerRun"> | string;
    runDate?: Prisma.DateTimeWithAggregatesFilter<"SchedulerRun"> | Date | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"SchedulerRun"> | Date | string;
};
export type SchedulerRunCreateInput = {
    jobName: string;
    runDate: Date | string;
    createdAt?: Date | string;
};
export type SchedulerRunUncheckedCreateInput = {
    id?: number;
    jobName: string;
    runDate: Date | string;
    createdAt?: Date | string;
};
export type SchedulerRunUpdateInput = {
    jobName?: Prisma.StringFieldUpdateOperationsInput | string;
    runDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SchedulerRunUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    jobName?: Prisma.StringFieldUpdateOperationsInput | string;
    runDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SchedulerRunCreateManyInput = {
    id?: number;
    jobName: string;
    runDate: Date | string;
    createdAt?: Date | string;
};
export type SchedulerRunUpdateManyMutationInput = {
    jobName?: Prisma.StringFieldUpdateOperationsInput | string;
    runDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SchedulerRunUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    jobName?: Prisma.StringFieldUpdateOperationsInput | string;
    runDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SchedulerRunJobNameRunDateCompoundUniqueInput = {
    jobName: string;
    runDate: Date | string;
};
export type SchedulerRunCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    jobName?: Prisma.SortOrder;
    runDate?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type SchedulerRunAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
};
export type SchedulerRunMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    jobName?: Prisma.SortOrder;
    runDate?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type SchedulerRunMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    jobName?: Prisma.SortOrder;
    runDate?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type SchedulerRunSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
};
export type SchedulerRunSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    jobName?: boolean;
    runDate?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["schedulerRun"]>;
export type SchedulerRunSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    jobName?: boolean;
    runDate?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["schedulerRun"]>;
export type SchedulerRunSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    jobName?: boolean;
    runDate?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["schedulerRun"]>;
export type SchedulerRunSelectScalar = {
    id?: boolean;
    jobName?: boolean;
    runDate?: boolean;
    createdAt?: boolean;
};
export type SchedulerRunOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "jobName" | "runDate" | "createdAt", ExtArgs["result"]["schedulerRun"]>;
export type $SchedulerRunPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "SchedulerRun";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        jobName: string;
        runDate: Date;
        createdAt: Date;
    }, ExtArgs["result"]["schedulerRun"]>;
    composites: {};
};
export type SchedulerRunGetPayload<S extends boolean | null | undefined | SchedulerRunDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$SchedulerRunPayload, S>;
export type SchedulerRunCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<SchedulerRunFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: SchedulerRunCountAggregateInputType | true;
};
export interface SchedulerRunDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['SchedulerRun'];
        meta: {
            name: 'SchedulerRun';
        };
    };
    /**
     * Find zero or one SchedulerRun that matches the filter.
     * @param {SchedulerRunFindUniqueArgs} args - Arguments to find a SchedulerRun
     * @example
     * // Get one SchedulerRun
     * const schedulerRun = await prisma.schedulerRun.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SchedulerRunFindUniqueArgs>(args: Prisma.SelectSubset<T, SchedulerRunFindUniqueArgs<ExtArgs>>): Prisma.Prisma__SchedulerRunClient<runtime.Types.Result.GetResult<Prisma.$SchedulerRunPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one SchedulerRun that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SchedulerRunFindUniqueOrThrowArgs} args - Arguments to find a SchedulerRun
     * @example
     * // Get one SchedulerRun
     * const schedulerRun = await prisma.schedulerRun.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SchedulerRunFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, SchedulerRunFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__SchedulerRunClient<runtime.Types.Result.GetResult<Prisma.$SchedulerRunPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first SchedulerRun that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SchedulerRunFindFirstArgs} args - Arguments to find a SchedulerRun
     * @example
     * // Get one SchedulerRun
     * const schedulerRun = await prisma.schedulerRun.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SchedulerRunFindFirstArgs>(args?: Prisma.SelectSubset<T, SchedulerRunFindFirstArgs<ExtArgs>>): Prisma.Prisma__SchedulerRunClient<runtime.Types.Result.GetResult<Prisma.$SchedulerRunPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first SchedulerRun that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SchedulerRunFindFirstOrThrowArgs} args - Arguments to find a SchedulerRun
     * @example
     * // Get one SchedulerRun
     * const schedulerRun = await prisma.schedulerRun.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SchedulerRunFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, SchedulerRunFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__SchedulerRunClient<runtime.Types.Result.GetResult<Prisma.$SchedulerRunPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more SchedulerRuns that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SchedulerRunFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SchedulerRuns
     * const schedulerRuns = await prisma.schedulerRun.findMany()
     *
     * // Get first 10 SchedulerRuns
     * const schedulerRuns = await prisma.schedulerRun.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const schedulerRunWithIdOnly = await prisma.schedulerRun.findMany({ select: { id: true } })
     *
     */
    findMany<T extends SchedulerRunFindManyArgs>(args?: Prisma.SelectSubset<T, SchedulerRunFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SchedulerRunPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a SchedulerRun.
     * @param {SchedulerRunCreateArgs} args - Arguments to create a SchedulerRun.
     * @example
     * // Create one SchedulerRun
     * const SchedulerRun = await prisma.schedulerRun.create({
     *   data: {
     *     // ... data to create a SchedulerRun
     *   }
     * })
     *
     */
    create<T extends SchedulerRunCreateArgs>(args: Prisma.SelectSubset<T, SchedulerRunCreateArgs<ExtArgs>>): Prisma.Prisma__SchedulerRunClient<runtime.Types.Result.GetResult<Prisma.$SchedulerRunPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many SchedulerRuns.
     * @param {SchedulerRunCreateManyArgs} args - Arguments to create many SchedulerRuns.
     * @example
     * // Create many SchedulerRuns
     * const schedulerRun = await prisma.schedulerRun.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends SchedulerRunCreateManyArgs>(args?: Prisma.SelectSubset<T, SchedulerRunCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many SchedulerRuns and returns the data saved in the database.
     * @param {SchedulerRunCreateManyAndReturnArgs} args - Arguments to create many SchedulerRuns.
     * @example
     * // Create many SchedulerRuns
     * const schedulerRun = await prisma.schedulerRun.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many SchedulerRuns and only return the `id`
     * const schedulerRunWithIdOnly = await prisma.schedulerRun.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends SchedulerRunCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, SchedulerRunCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SchedulerRunPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a SchedulerRun.
     * @param {SchedulerRunDeleteArgs} args - Arguments to delete one SchedulerRun.
     * @example
     * // Delete one SchedulerRun
     * const SchedulerRun = await prisma.schedulerRun.delete({
     *   where: {
     *     // ... filter to delete one SchedulerRun
     *   }
     * })
     *
     */
    delete<T extends SchedulerRunDeleteArgs>(args: Prisma.SelectSubset<T, SchedulerRunDeleteArgs<ExtArgs>>): Prisma.Prisma__SchedulerRunClient<runtime.Types.Result.GetResult<Prisma.$SchedulerRunPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one SchedulerRun.
     * @param {SchedulerRunUpdateArgs} args - Arguments to update one SchedulerRun.
     * @example
     * // Update one SchedulerRun
     * const schedulerRun = await prisma.schedulerRun.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends SchedulerRunUpdateArgs>(args: Prisma.SelectSubset<T, SchedulerRunUpdateArgs<ExtArgs>>): Prisma.Prisma__SchedulerRunClient<runtime.Types.Result.GetResult<Prisma.$SchedulerRunPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more SchedulerRuns.
     * @param {SchedulerRunDeleteManyArgs} args - Arguments to filter SchedulerRuns to delete.
     * @example
     * // Delete a few SchedulerRuns
     * const { count } = await prisma.schedulerRun.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends SchedulerRunDeleteManyArgs>(args?: Prisma.SelectSubset<T, SchedulerRunDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more SchedulerRuns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SchedulerRunUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SchedulerRuns
     * const schedulerRun = await prisma.schedulerRun.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends SchedulerRunUpdateManyArgs>(args: Prisma.SelectSubset<T, SchedulerRunUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more SchedulerRuns and returns the data updated in the database.
     * @param {SchedulerRunUpdateManyAndReturnArgs} args - Arguments to update many SchedulerRuns.
     * @example
     * // Update many SchedulerRuns
     * const schedulerRun = await prisma.schedulerRun.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more SchedulerRuns and only return the `id`
     * const schedulerRunWithIdOnly = await prisma.schedulerRun.updateManyAndReturn({
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
    updateManyAndReturn<T extends SchedulerRunUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, SchedulerRunUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SchedulerRunPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one SchedulerRun.
     * @param {SchedulerRunUpsertArgs} args - Arguments to update or create a SchedulerRun.
     * @example
     * // Update or create a SchedulerRun
     * const schedulerRun = await prisma.schedulerRun.upsert({
     *   create: {
     *     // ... data to create a SchedulerRun
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SchedulerRun we want to update
     *   }
     * })
     */
    upsert<T extends SchedulerRunUpsertArgs>(args: Prisma.SelectSubset<T, SchedulerRunUpsertArgs<ExtArgs>>): Prisma.Prisma__SchedulerRunClient<runtime.Types.Result.GetResult<Prisma.$SchedulerRunPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of SchedulerRuns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SchedulerRunCountArgs} args - Arguments to filter SchedulerRuns to count.
     * @example
     * // Count the number of SchedulerRuns
     * const count = await prisma.schedulerRun.count({
     *   where: {
     *     // ... the filter for the SchedulerRuns we want to count
     *   }
     * })
    **/
    count<T extends SchedulerRunCountArgs>(args?: Prisma.Subset<T, SchedulerRunCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], SchedulerRunCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a SchedulerRun.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SchedulerRunAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SchedulerRunAggregateArgs>(args: Prisma.Subset<T, SchedulerRunAggregateArgs>): Prisma.PrismaPromise<GetSchedulerRunAggregateType<T>>;
    /**
     * Group by SchedulerRun.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SchedulerRunGroupByArgs} args - Group by arguments.
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
    groupBy<T extends SchedulerRunGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: SchedulerRunGroupByArgs['orderBy'];
    } : {
        orderBy?: SchedulerRunGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, SchedulerRunGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSchedulerRunGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the SchedulerRun model
     */
    readonly fields: SchedulerRunFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for SchedulerRun.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__SchedulerRunClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
 * Fields of the SchedulerRun model
 */
export interface SchedulerRunFieldRefs {
    readonly id: Prisma.FieldRef<"SchedulerRun", 'Int'>;
    readonly jobName: Prisma.FieldRef<"SchedulerRun", 'String'>;
    readonly runDate: Prisma.FieldRef<"SchedulerRun", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"SchedulerRun", 'DateTime'>;
}
/**
 * SchedulerRun findUnique
 */
export type SchedulerRunFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SchedulerRun
     */
    select?: Prisma.SchedulerRunSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the SchedulerRun
     */
    omit?: Prisma.SchedulerRunOmit<ExtArgs> | null;
    /**
     * Filter, which SchedulerRun to fetch.
     */
    where: Prisma.SchedulerRunWhereUniqueInput;
};
/**
 * SchedulerRun findUniqueOrThrow
 */
export type SchedulerRunFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SchedulerRun
     */
    select?: Prisma.SchedulerRunSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the SchedulerRun
     */
    omit?: Prisma.SchedulerRunOmit<ExtArgs> | null;
    /**
     * Filter, which SchedulerRun to fetch.
     */
    where: Prisma.SchedulerRunWhereUniqueInput;
};
/**
 * SchedulerRun findFirst
 */
export type SchedulerRunFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SchedulerRun
     */
    select?: Prisma.SchedulerRunSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the SchedulerRun
     */
    omit?: Prisma.SchedulerRunOmit<ExtArgs> | null;
    /**
     * Filter, which SchedulerRun to fetch.
     */
    where?: Prisma.SchedulerRunWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of SchedulerRuns to fetch.
     */
    orderBy?: Prisma.SchedulerRunOrderByWithRelationInput | Prisma.SchedulerRunOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for SchedulerRuns.
     */
    cursor?: Prisma.SchedulerRunWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` SchedulerRuns from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` SchedulerRuns.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of SchedulerRuns.
     */
    distinct?: Prisma.SchedulerRunScalarFieldEnum | Prisma.SchedulerRunScalarFieldEnum[];
};
/**
 * SchedulerRun findFirstOrThrow
 */
export type SchedulerRunFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SchedulerRun
     */
    select?: Prisma.SchedulerRunSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the SchedulerRun
     */
    omit?: Prisma.SchedulerRunOmit<ExtArgs> | null;
    /**
     * Filter, which SchedulerRun to fetch.
     */
    where?: Prisma.SchedulerRunWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of SchedulerRuns to fetch.
     */
    orderBy?: Prisma.SchedulerRunOrderByWithRelationInput | Prisma.SchedulerRunOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for SchedulerRuns.
     */
    cursor?: Prisma.SchedulerRunWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` SchedulerRuns from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` SchedulerRuns.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of SchedulerRuns.
     */
    distinct?: Prisma.SchedulerRunScalarFieldEnum | Prisma.SchedulerRunScalarFieldEnum[];
};
/**
 * SchedulerRun findMany
 */
export type SchedulerRunFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SchedulerRun
     */
    select?: Prisma.SchedulerRunSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the SchedulerRun
     */
    omit?: Prisma.SchedulerRunOmit<ExtArgs> | null;
    /**
     * Filter, which SchedulerRuns to fetch.
     */
    where?: Prisma.SchedulerRunWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of SchedulerRuns to fetch.
     */
    orderBy?: Prisma.SchedulerRunOrderByWithRelationInput | Prisma.SchedulerRunOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing SchedulerRuns.
     */
    cursor?: Prisma.SchedulerRunWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` SchedulerRuns from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` SchedulerRuns.
     */
    skip?: number;
    distinct?: Prisma.SchedulerRunScalarFieldEnum | Prisma.SchedulerRunScalarFieldEnum[];
};
/**
 * SchedulerRun create
 */
export type SchedulerRunCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SchedulerRun
     */
    select?: Prisma.SchedulerRunSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the SchedulerRun
     */
    omit?: Prisma.SchedulerRunOmit<ExtArgs> | null;
    /**
     * The data needed to create a SchedulerRun.
     */
    data: Prisma.XOR<Prisma.SchedulerRunCreateInput, Prisma.SchedulerRunUncheckedCreateInput>;
};
/**
 * SchedulerRun createMany
 */
export type SchedulerRunCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many SchedulerRuns.
     */
    data: Prisma.SchedulerRunCreateManyInput | Prisma.SchedulerRunCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * SchedulerRun createManyAndReturn
 */
export type SchedulerRunCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SchedulerRun
     */
    select?: Prisma.SchedulerRunSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the SchedulerRun
     */
    omit?: Prisma.SchedulerRunOmit<ExtArgs> | null;
    /**
     * The data used to create many SchedulerRuns.
     */
    data: Prisma.SchedulerRunCreateManyInput | Prisma.SchedulerRunCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * SchedulerRun update
 */
export type SchedulerRunUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SchedulerRun
     */
    select?: Prisma.SchedulerRunSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the SchedulerRun
     */
    omit?: Prisma.SchedulerRunOmit<ExtArgs> | null;
    /**
     * The data needed to update a SchedulerRun.
     */
    data: Prisma.XOR<Prisma.SchedulerRunUpdateInput, Prisma.SchedulerRunUncheckedUpdateInput>;
    /**
     * Choose, which SchedulerRun to update.
     */
    where: Prisma.SchedulerRunWhereUniqueInput;
};
/**
 * SchedulerRun updateMany
 */
export type SchedulerRunUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update SchedulerRuns.
     */
    data: Prisma.XOR<Prisma.SchedulerRunUpdateManyMutationInput, Prisma.SchedulerRunUncheckedUpdateManyInput>;
    /**
     * Filter which SchedulerRuns to update
     */
    where?: Prisma.SchedulerRunWhereInput;
    /**
     * Limit how many SchedulerRuns to update.
     */
    limit?: number;
};
/**
 * SchedulerRun updateManyAndReturn
 */
export type SchedulerRunUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SchedulerRun
     */
    select?: Prisma.SchedulerRunSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the SchedulerRun
     */
    omit?: Prisma.SchedulerRunOmit<ExtArgs> | null;
    /**
     * The data used to update SchedulerRuns.
     */
    data: Prisma.XOR<Prisma.SchedulerRunUpdateManyMutationInput, Prisma.SchedulerRunUncheckedUpdateManyInput>;
    /**
     * Filter which SchedulerRuns to update
     */
    where?: Prisma.SchedulerRunWhereInput;
    /**
     * Limit how many SchedulerRuns to update.
     */
    limit?: number;
};
/**
 * SchedulerRun upsert
 */
export type SchedulerRunUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SchedulerRun
     */
    select?: Prisma.SchedulerRunSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the SchedulerRun
     */
    omit?: Prisma.SchedulerRunOmit<ExtArgs> | null;
    /**
     * The filter to search for the SchedulerRun to update in case it exists.
     */
    where: Prisma.SchedulerRunWhereUniqueInput;
    /**
     * In case the SchedulerRun found by the `where` argument doesn't exist, create a new SchedulerRun with this data.
     */
    create: Prisma.XOR<Prisma.SchedulerRunCreateInput, Prisma.SchedulerRunUncheckedCreateInput>;
    /**
     * In case the SchedulerRun was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.SchedulerRunUpdateInput, Prisma.SchedulerRunUncheckedUpdateInput>;
};
/**
 * SchedulerRun delete
 */
export type SchedulerRunDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SchedulerRun
     */
    select?: Prisma.SchedulerRunSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the SchedulerRun
     */
    omit?: Prisma.SchedulerRunOmit<ExtArgs> | null;
    /**
     * Filter which SchedulerRun to delete.
     */
    where: Prisma.SchedulerRunWhereUniqueInput;
};
/**
 * SchedulerRun deleteMany
 */
export type SchedulerRunDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which SchedulerRuns to delete
     */
    where?: Prisma.SchedulerRunWhereInput;
    /**
     * Limit how many SchedulerRuns to delete.
     */
    limit?: number;
};
/**
 * SchedulerRun without action
 */
export type SchedulerRunDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SchedulerRun
     */
    select?: Prisma.SchedulerRunSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the SchedulerRun
     */
    omit?: Prisma.SchedulerRunOmit<ExtArgs> | null;
};
export {};
//# sourceMappingURL=SchedulerRun.d.ts.map