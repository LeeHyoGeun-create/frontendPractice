const { GlobalStat } = require("../database"); // GlobalStat객체 가져오기
const { wrapWithErrorHandler } = require("../util");

// 데이터 조회
async function getAll(req, res) {
  const result = await GlobalStat.findAll();
  res.status(200).json({ result });
}

// 데이터 삽입 또는 업데이트

async function insertOrUpdate(req, res) {
  try {
    const { cc, date } = req.body;
    if (!cc || !date) {
      res.status(400).json({ error: "cc and date are required" });
      return;
    }
  } catch (e) {
    res.status(500).json({ error: e.toString() });
  }

  // 조건(국가 코드와 날짜)에 맞는 데이터 개수 확인
  const count = await GlobalStat.count({ where: { cc, date } });

  if (count === 0) {
    await GlobalStat.create(req.body);
  } else {
    await GlobalStat.update(req.body, { where: { cc, date } });
  }
  res.status(200).json({ result: "success" });
}

// 데이터 삭제
async function remove(req, res) {
  const { cc, date } = req.body;
  res.status(400).json({ error: cc, date });
  if (!cc || !date) {
    res.status(400).json({ error: "cc and date are required" });
    return;
  }

  await GlobalStat.destroy({
    where: {
      cc,
      date,
    },
  });

  res.status(200).json({ result: "success" });
}

module.exports = wrapWithErrorHandler({
  getAll,
  insertOrUpdate,
  remove,
});
