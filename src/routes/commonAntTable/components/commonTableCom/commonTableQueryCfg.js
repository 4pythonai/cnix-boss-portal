export default function createQueryConfig(search_query_cfg, query_cfg) {
        var QueryConfig = {};
        if (typeof search_query_cfg != null && typeof search_query_cfg != 'object') {
                QueryConfig = search_query_cfg;
        } else {
                if (query_cfg == null && search_query_cfg != null) {
                        var arr = search_query_cfg;
                        QueryConfig.count = arr.length;
                        arr.map((item) => {
                                QueryConfig.lines = { ...QueryConfig.lines, ...item };
                        });
                } else if (query_cfg != null && search_query_cfg == null) {
                        QueryConfig = query_cfg;
                } else if (query_cfg == null && search_query_cfg == null) {
                        QueryConfig = null;
                } else if (query_cfg != null && search_query_cfg != null) {
                        var queryarr = Object.keys(query_cfg.lines);
                        var num1 = queryarr.length / 4;
                        var count = queryarr.length / 4;
                        var num = search_query_cfg.length;
                        var arr = [];
                        for (var i = 0; i < num; i++) {
                                var str = JSON.stringify(search_query_cfg[i]) + '';
                                var key = '_' + i;
                                var newkey = '_' + count;
                                str = str.replace(new RegExp(key, 'g'), newkey);
                                arr.push(JSON.parse(str));
                                count++;
                        }
                        var query_cfg1 = {};
                        arr.map((item) => {
                                query_cfg.lines = { ...query_cfg.lines, ...item };
                        });

                        Object.assign(query_cfg1, query_cfg.lines, query_cfg.lines);
                        QueryConfig.count = num1 + num;
                        QueryConfig.lines = query_cfg1;
                }
        }

        return QueryConfig;
}
