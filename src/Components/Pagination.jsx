import { Button, Stack } from "@mui/material"

const Pagination = ({ totalData, dataPerPage, setCurrentPage, currentPage }) => {
    let pages = []
    for (let i = 1; i <= Math.ceil(totalData / dataPerPage); i++) {
        pages.push(i)
    }
    return (
        <Stack display={'flex'} justifyContent='center' padding={'5px'} direction={'row'} spacing={2}>
            {currentPage !== 1 ? (<Button color='secondary' size="small" variant="contained" onClick={() => setCurrentPage(currentPage - 1)} >Previous Page</Button>) : (null)}
            {
                pages.map((page, index) => (
                    <Button
                        size="small"
                        key={index}
                        onClick={() => setCurrentPage(page)}
                        variant={page === currentPage ? ('outlined') : ('contained')}
                        color='secondary'
                    >
                        {page}
                    </Button>

                ))
            }
            {currentPage !== pages.length ? (<Button color='secondary' size="small" variant="contained" onClick={() => setCurrentPage(currentPage + 1)} >Next Page</Button>) : (null)}
        </Stack>
    )
}

export default Pagination