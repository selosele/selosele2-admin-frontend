import './Main.css'
import { Layout } from '@/components/Layout'

/** 메인 페이지 컴포넌트 */
export default function Main() {
  return (
    <>
      <Layout.TopNav />

      <Layout.Container>
        <main>
          메인 페이지
        </main>
      </Layout.Container>

      <Layout.Footer />
    </>
  )
}
