import styled from 'styled-components'

export const AddressInfoSection = styled.section`
  padding: 1rem;
  background-color: #ffffff;
  border-bottom: 1px solid #dee2e6;

  h2 {
    margin: 0 0 1rem 0;
    color: #333;
    font-size: 1.25rem;
  }

  p {
    margin: 0;
    color: #666;
  }
`

export const InfoCard = styled.div`
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  padding: 1rem;
`

export const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.75rem;

  &:last-child {
    margin-bottom: 0;
  }
`

export const InfoLabel = styled.span`
  font-weight: 600;
  color: #495057;
  font-size: 0.875rem;
  min-width: 100px;
`

export const InfoValue = styled.span`
  color: #212529;
  font-size: 0.875rem;
  text-align: right;
  word-break: break-word;
  max-width: 200px;
`
