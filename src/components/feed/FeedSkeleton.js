import styled from 'styled-components';
import { breakPoints } from 'components/common/Media';

export default function FeedSkeleton() {
  return (
    <>
      {new Array(3).fill('').map((_, index) => (
        <FeedSkeletonWrapper key={index}>
          <Card>
            <Tag />
            <Description />
            <Contents>
              <Profile />
              <Content />
            </Contents>
            <Reaction />
          </Card>
        </FeedSkeletonWrapper>
      ))}
    </>
  );
}

const FeedSkeletonWrapper = styled.li`
  width: 100%;
  padding: 3.2rem;
  border-radius: 1.6rem;
  background: var(--gray10);
  box-shadow: var(--shadow1pt);
  list-style: none;

  @media screen and (${breakPoints.mobile}) {
    padding: 2.4rem;
  }
`;

const Card = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 2.4rem;
  word-break: break-all;

  @media screen and (${breakPoints.mobile}) {
    gap: 2.4rem;
  }
`;

const Tag = styled.span`
  width: 8rem;
  height: 2.6rem;
  background: #f2f2f2;
`;

const Description = styled.div`
  width: 50%;
  height: 4.4rem;
  background: #f2f2f2;
`;

const Contents = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1.2rem;
`;

const Profile = styled.div`
  width: 4.8rem;
  height: 4.8rem;
  border-radius: 100%;
  background: #f2f2f2;
`;

const Content = styled.div`
  width: 100%;
  height: 15rem;
  display: flex;
  flex-direction: column;
  background: #f2f2f2;
`;

const Reaction = styled.div`
  width: 100%;
  height: 2.6rem;
  background: #f2f2f2;
`;
