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

const SkeletonItem = styled.div`
  width: 100%;
  background-color: #f2f2f2;
  position: relative;
  overflow: hidden;
  border-radius: 4px;

  @keyframes skeleton-gradient {
    0% {
      background-color: rgba(165, 165, 165, 0.1);
    }
    50% {
      background-color: rgba(165, 165, 165, 0.3);
    }
    100% {
      background-color: rgba(165, 165, 165, 0.1);
    }
  }

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    animation: skeleton-gradient 1.5s infinite ease-in-out;
  }
`;

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

  @media screen and (${breakPoints.mobile}) {
    gap: 2.4rem;
  }
`;

const Tag = styled(SkeletonItem)`
  width: 8rem;
  height: 2.6rem;
`;

const Description = styled(SkeletonItem)`
  width: 50%;
  height: 4.4rem;
`;

const Contents = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1.2rem;
`;

const Profile = styled(SkeletonItem)`
  width: 4.8rem;
  height: 4.8rem;
  border-radius: 100%;
`;

const Content = styled(SkeletonItem)`
  width: 90%;
  height: 15rem;
`;

const Reaction = styled(SkeletonItem)`
  height: 2.6rem;
`;
