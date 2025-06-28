import styled from 'styled-components'

export const Container = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin: 20px;
  max-height: 400px;
  overflow-y: auto;
`

export const Title = styled.h3`
  margin: 0 0 20px 0;
  color: #333;
  font-size: 18px;
  font-weight: 600;
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 10px;
`

export const AreaItem = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  margin-bottom: 15px;
  background: #fafafa;
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    border-color: #ccc;
  }
`

export const AreaHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 15px;
  background: #f8f9fa;
  border-bottom: 1px solid #e0e0e0;
  border-radius: 6px 6px 0 0;

  h4 {
    margin: 0;
    color: #333;
    font-size: 16px;
    font-weight: 600;
  }
`

export const AreaDetails = styled.div`
  padding: 15px;

  div {
    margin-bottom: 8px;
    font-size: 14px;
    color: #555;

    &:last-child {
      margin-bottom: 0;
    }

    strong {
      color: #333;
    }
  }
`

export const DeleteButton = styled.button`
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;

  &:hover {
    background: #c82333;
  }
`

export const EmptyMessage = styled.div`
  text-align: center;
  color: #666;
  font-style: italic;
  padding: 40px 20px;
`
