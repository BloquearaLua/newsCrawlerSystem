import React,{ useEffect, useRef, useState } from 'react';
import moment from 'moment';
import { useNavigate } from 'react-router-dom'
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { Box, Divider, InputBase, Typography } from '@mui/material';
import { makeStyles } from '@material-ui/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

import { Search, SearchIconWrapper, StyledInputBase} from '../Search';
import { axiosGet } from '../../../util/https';

const useStyles = makeStyles({
    tableContainer:{
        margin: "1.2em",
        border: "solid 1px #e3f2fd",
        borderRadius: '10px',
        backgroundColor: "#fff",
        width: 'auto',
        // height: "auto"
    },
    title: {
        padding: '1em',
        width: "18em"
    },
    search:{
        // '&:hover':{
        //     border: '1px solid #616161'
        // }
    }
});

const source = {
    1: "新浪新闻",
    2: "华尔街新闻"
  }
export default function NewsTable(props) {
    console.log("props",props);
    const { rowCount, newsList, handleGet,title } = props;
    const classes = useStyles();
    const [pageSize,setPageSize] = useState(5);
    const [page,setPage] = useState(0);
    const [list,setList] = useState([]);
    const [inputValue,setInputValue] = useState("");
    const [count,setCount] = useState(0);
    const navigate = useNavigate();
    const col = [
        { field: 'title', headerName: '标题', width: 450 },
        { field: 'author', headerName: '作者', width: 150 },
        { field: 'publishDate', headerName: '发布日期',type: 'date', width: 150 },
        { field: 'source', headerName: '来源', width: 150 },
        { field: 'actions', headerName: '操作', type: 'actions', width: 150, 
            getActions: (params) => [
                <GridActionsCellItem onClick={() => handleSee(params.row.url)} icon={<VisibilityOutlinedIcon />} label="Edit" />,
                <GridActionsCellItem onClick={() => handleDelete(params.id)} icon={<DeleteIcon />} label="Delete" />,
            ]
        },
    ];

    useEffect(() => {
        const result = handleData(newsList);
        setList([...list,...result]);
        // console.log(rowCount);
        setCount(rowCount);
    },[newsList,rowCount]);

    // 搜索防抖
    const useDebounce = (value,delay) => {
        const [debounceValue,setDebounceValue] = useState("");
        useEffect(() => {
            const timer = setTimeout(() => {
                setDebounceValue(value);
            },delay)
            return () => {
                clearTimeout(timer);
            }
        },[value,delay]);
        return debounceValue;
    }

    const text = useDebounce(inputValue,500);
    useEffect(() => {
        let sourceId = title === "管理员" ? 1 : 2;
        (async () => {
            const result = await axiosGet(`/api/news/search?sourceid=${sourceId}&&keyword=${text}`);
            console.log(result);
            const data = handleData(result);
            setList(data);
            setCount(result.length);
        })();
    },[text]);

    const handleData = (result) => {
        const data = [];
        result?.length && result.forEach((item) => {
            data.push({
                id: item.id,
                title: item.title,
                author: item.author,
                publishDate: item.publish_date ? moment(item.publish_date).format('YYYY/MM/DD') : null,
                source: source[item.news_source],
                url: item.url
            })
        })
        // console.log("data",data);
        return data;
    }

    const handleSee = (url) => {
        console.log(url);
        window.open(url)
    } 

    const handleDelete = (id) => {
        setTimeout(() => {
            setList(list.filter((item) => item.id!==id))
        })
    } 

    const handlePageSizeChange = (pageSize) => {
        setPageSize(pageSize);
        if(!text){
            handleGet(page+1,pageSize)
        }
    }
    const handlePageChange = (p) => {
        console.log(p);
        setPage(p);
        if(!text){
            handleGet(p+1,pageSize);
        }
    }
    return (
        <Box className={classes.tableContainer}>
            <Box className={classes.title}>
                <Typography variant='h5' component="div">{title}</Typography>
            </Box>
            <Divider/>
            <Box className={classes.title}>
                <Search className={classes.search}>
                    <SearchIconWrapper>
                    <SearchIcon color="action"/>
                    </SearchIconWrapper>
                    <StyledInputBase
                        onChange={(e) => setInputValue(e.target.value)}
                        value={inputValue}
                        placeholder="请输入关键词"
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </Search>
            </Box>
            <Box>
                <DataGrid
                    sx={{ border:'none',m:"0 2em"}} 
                    rows={list} 
                    columns={col} 
                    // autoHeight1
                    pageSize={pageSize}
                    onPageSizeChange={(pageSize) => handlePageSizeChange(pageSize)}
                    onPageChange={(p) => handlePageChange(p)}
                    rowsPerPageOptions={[5,10, 20, 50]}
                    pagination
                    autoHeight
                    checkboxSelection
                    // page = {page}
                    rowCount={count}
                />
            </Box>
        </Box>
    )
}

