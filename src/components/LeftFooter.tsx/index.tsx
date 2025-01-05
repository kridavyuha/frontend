import { Button } from "@mantine/core";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";


const SLeftFooter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
  margin-right: 30px;
  margin-top: 10px;
`;

function LeftFooterIndex() {
  const navigate = useNavigate();
  return (
    <SLeftFooter>
     <h1>Leader board</h1>
     <h1>Live contest</h1>
    </SLeftFooter>
  );
}

export default LeftFooterIndex;