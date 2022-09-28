import Box from '@mui/material/Box';

function StatusInd({ color }) {
    const shapeStyles = { bgcolor: color, width: 10, height: 10 };
    const shapeCircleStyles = { borderRadius: '50%' };
    return <Box component="span" sx={{ ...shapeStyles, ...shapeCircleStyles }} />
}

export default StatusInd;